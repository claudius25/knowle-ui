import { Injectable, OnDestroy, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  ExecutionProvider,
  TtsConfig,
  TtsOptions,
  TtsProgress,
  TtsStatus,
  WorkerRequest,
  WorkerResponse,
} from './tts.types';
import { LanguageService } from '../services/language.service';
import { SupertonicEngine } from './engine/tts-engine';
import { TtsModelCacheService } from './storage/tts-model-cache.service';

function isMobileBrowser(): boolean {
  if (typeof navigator === 'undefined') return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile/i.test(
    navigator.userAgent,
  );
}

const DEFAULT_TTS_CONFIG: TtsConfig = {
  modelBasePath: '/tts/onnx',
  wasmBasePath: '/tts/wasm/',
  defaultVoice: 'F1',
  preferWebGpu: !isMobileBrowser(),
  totalStep: 4,
  speed: 1.05,
};

@Injectable({ providedIn: 'root' })
export class TtsService implements OnDestroy {
  private readonly languageService = inject(LanguageService);
  private readonly modelCache = inject(TtsModelCacheService);

  private readonly statusSubject = new BehaviorSubject<TtsStatus>('uninitialized');
  private readonly progressSubject = new BehaviorSubject<TtsProgress | null>(null);
  private readonly activeBackendSubject = new BehaviorSubject<ExecutionProvider | null>(null);
  private readonly isSpeakingSubject = new BehaviorSubject<boolean>(false);
  private readonly errorSubject = new BehaviorSubject<string | null>(null);

  readonly status$: Observable<TtsStatus> = this.statusSubject.asObservable();
  readonly progress$: Observable<TtsProgress | null> = this.progressSubject.asObservable();
  readonly activeBackend$: Observable<ExecutionProvider | null> =
    this.activeBackendSubject.asObservable();
  readonly isSpeaking$: Observable<boolean> = this.isSpeakingSubject.asObservable();
  readonly error$: Observable<string | null> = this.errorSubject.asObservable();

  private worker: Worker | null = null;
  private fallbackEngine: SupertonicEngine | null = null;
  private config: TtsConfig = DEFAULT_TTS_CONFIG;
  private initPromise: Promise<void> | null = null;

  // Audio Caching Layer (In-Memory + IndexedDB for instant replay across sessions)
  private readonly memoryCache = new Map<string, Blob>();
  private readonly inFlightGenerations = new Map<string, Promise<Blob>>();
  private idbPromise: Promise<IDBDatabase | null> | null = null;

  private audioCtx: AudioContext | null = null;
  private currentAudioSource: AudioBufferSourceNode | null = null;
  private currentAudioElement: HTMLAudioElement | null = null;
  private currentBlobUrl: string | null = null;
  private pendingRequests = new Map<
    string,
    {
      resolve: (value: WorkerResponse) => void;
      reject: (reason: unknown) => void;
    }
  >();

  constructor() {
    this.setupWorker();
    this.initIndexedDb();
  }

  ngOnDestroy(): void {
    this.stop();
    this.worker?.terminate();
    this.audioCtx?.close().catch(() => {});
  }

  get currentStatus(): TtsStatus {
    return this.statusSubject.value;
  }

  get isSpeaking(): boolean {
    return this.isSpeakingSubject.value;
  }

  get activeBackend(): ExecutionProvider | null {
    return this.activeBackendSubject.value;
  }

  /**
   * Initializes the Supertonic 3 model sessions.
   * Called automatically on the first `speak()` call or manually for preloading.
   */
  async init(customConfig?: Partial<TtsConfig>): Promise<void> {
    if (
      this.statusSubject.value === 'ready' ||
      this.statusSubject.value === 'speaking' ||
      this.statusSubject.value === 'generating'
    ) {
      return;
    }

    if (this.initPromise) {
      return this.initPromise;
    }

    this.config = { ...DEFAULT_TTS_CONFIG, ...customConfig };
    this.statusSubject.next('loading');
    this.errorSubject.next(null);

    this.initPromise = (async () => {
      try {
        // Step 1: Ensure models are downloaded and cached in OPFS
        if (this.modelCache.isOpfsSupported()) {
          try {
            await this.modelCache.ensureModelsCached(this.config.modelBasePath, (prog) => {
              this.progressSubject.next(prog);
            });
          } catch (cacheErr) {
            console.warn(
              '[TTS] OPFS model caching encountered an error, falling back to direct loading:',
              cacheErr,
            );
          }
        }

        // Step 2: Initialize Supertonic engine (worker or main thread)
        if (this.worker) {
          const response = await this.sendWorkerRequest<WorkerResponse>({
            id: this.generateRequestId(),
            type: 'INIT',
            config: this.config,
          });

          if (response.type === 'INIT_SUCCESS') {
            this.activeBackendSubject.next(response.provider);
            this.statusSubject.next('ready');
            this.progressSubject.next(null);
          } else {
            throw new Error('Unexpected response during initialization');
          }
        } else {
          // Direct main-thread fallback
          this.fallbackEngine = new SupertonicEngine();
          const provider = await this.fallbackEngine.init(this.config, (prog) => {
            this.progressSubject.next(prog);
          });
          this.activeBackendSubject.next(provider);
          this.statusSubject.next('ready');
          this.progressSubject.next(null);
        }
      } catch (err: unknown) {
        const errorMsg = err instanceof Error ? err.message : String(err);
        this.statusSubject.next('error');
        this.errorSubject.next(errorMsg);
        this.initPromise = null;
        throw err;
      }
    })();

    return this.initPromise;
  }

  /**
   * Preloads an additional voice style (e.g. 'M1' for a male voice) so it can be used with `speak()`.
   */
  async loadVoice(voiceName: string): Promise<void> {
    await this.init();
    const voicePath = `${this.config.modelBasePath}/../voice_styles/${voiceName}.json`;

    if (this.worker) {
      await this.sendWorkerRequest<WorkerResponse>({
        id: this.generateRequestId(),
        type: 'LOAD_VOICE',
        voice: voiceName,
        voicePath,
      });
    } else if (this.fallbackEngine) {
      await this.fallbackEngine.loadVoiceStyle(voiceName, voicePath);
    }
  }

  /**
   * Synthesizes and plays the provided text aloud.
   */
  async speak(text: string, options?: TtsOptions): Promise<void> {
    if (!text || !text.trim()) {
      return;
    }

    this.stop();
    const wavBlob = await this.generateWav(text, options);
    await this.playAudioBlob(wavBlob);
  }

  /**
   * Generates a standard WAV audio Blob from text using Supertonic 3.
   * Utilizes an in-memory and persistent IndexedDB cache for instant replay of identical texts.
   */
  async generateWav(text: string, options?: TtsOptions): Promise<Blob> {
    if (!text || !text.trim()) {
      throw new Error('Cannot synthesize empty text.');
    }

    const currentLang = options?.lang || this.languageService.getCurrentLanguage() || 'ro';
    const voice = options?.voice || this.config.defaultVoice;
    const speed = options?.speed ?? this.config.speed;
    const steps = options?.steps ?? this.config.totalStep;
    const silenceDuration = options?.silenceDuration ?? 0.25;
    const cacheKey = this.buildCacheKey(text, currentLang, voice, speed, steps);

    // 1. Instant in-memory cache hit
    if (this.memoryCache.has(cacheKey)) {
      return this.memoryCache.get(cacheKey)!;
    }

    // 2. Persistent IndexedDB cache hit
    const idbBlob = await this.getFromIndexedDb(cacheKey);
    if (idbBlob) {
      this.memoryCache.set(cacheKey, idbBlob);
      return idbBlob;
    }

    // 3. Deduplicate in-flight generation for the same phrase
    if (this.inFlightGenerations.has(cacheKey)) {
      return this.inFlightGenerations.get(cacheKey)!;
    }

    // 4. Generate new audio via Supertonic neural inference
    await this.init();
    this.statusSubject.next('generating');

    const generationPromise = (async () => {
      try {
        let arrayBuffer: ArrayBuffer;

        if (this.worker) {
          const response = await this.sendWorkerRequest<WorkerResponse>({
            id: this.generateRequestId(),
            type: 'SYNTHESIZE',
            text,
            lang: currentLang,
            voice,
            speed,
            steps,
            silenceDuration,
          });

          if (response.type === 'SYNTHESIZE_SUCCESS') {
            arrayBuffer = response.audioBuffer;
          } else {
            throw new Error('Failed to generate audio in worker.');
          }
        } else if (this.fallbackEngine) {
          const result = await this.fallbackEngine.synthesize(
            text,
            currentLang,
            voice,
            speed,
            steps,
            silenceDuration,
            (prog) => this.progressSubject.next(prog),
          );
          arrayBuffer = result.wavBuffer;
        } else {
          throw new Error('TTS engine not available.');
        }

        this.statusSubject.next('ready');
        this.progressSubject.next(null);

        const blob = new Blob([arrayBuffer], { type: 'audio/wav' });
        this.memoryCache.set(cacheKey, blob);
        this.saveToIndexedDb(cacheKey, blob);
        return blob;
      } catch (err: unknown) {
        const errorMsg = err instanceof Error ? err.message : String(err);
        this.statusSubject.next('error');
        this.errorSubject.next(errorMsg);
        throw err;
      } finally {
        this.inFlightGenerations.delete(cacheKey);
      }
    })();

    this.inFlightGenerations.set(cacheKey, generationPromise);
    return generationPromise;
  }

  /**
   * Pre-synthesizes and caches one or more phrases in the background without playing them.
   */
  async preload(phrases: string[], options?: TtsOptions): Promise<void> {
    for (const phrase of phrases) {
      try {
        await this.generateWav(phrase, options);
      } catch (err) {
        console.warn('Failed to preload phrase:', phrase, err);
      }
    }
  }

  /**
   * Clears in-memory and persistent audio cache.
   */
  async clearCache(): Promise<void> {
    this.memoryCache.clear();
    if (!this.idbPromise) return;
    try {
      const db = await this.idbPromise;
      if (!db) return;
      const tx = db.transaction('audio_blobs', 'readwrite');
      const store = tx.objectStore('audio_blobs');
      store.clear();
    } catch (e) {
      console.warn('Failed to clear IndexedDB cache:', e);
    }
  }

  /**
   * Invalidates and clears the persistent OPFS model cache.
   */
  async clearModelCache(): Promise<void> {
    await this.modelCache.invalidateCache();
  }

  private buildCacheKey(
    text: string,
    lang: string,
    voice: string,
    speed: number,
    steps: number,
  ): string {
    return `${lang}_${voice}_${speed.toFixed(2)}_${steps}_${text.trim().toLowerCase()}`;
  }

  private initIndexedDb(): void {
    if (typeof indexedDB === 'undefined') return;

    this.idbPromise = new Promise((resolve) => {
      try {
        const req = indexedDB.open('knowle-tts-cache', 1);
        req.onupgradeneeded = () => {
          const db = req.result;
          if (!db.objectStoreNames.contains('audio_blobs')) {
            db.createObjectStore('audio_blobs');
          }
        };
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => {
          console.warn('Could not open IndexedDB for TTS caching:', req.error);
          resolve(null);
        };
      } catch (e) {
        console.warn('IndexedDB unavailable:', e);
        resolve(null);
      }
    });
  }

  private async getFromIndexedDb(key: string): Promise<Blob | null> {
    if (!this.idbPromise) return null;
    try {
      const db = await this.idbPromise;
      if (!db) return null;
      return new Promise<Blob | null>((resolve) => {
        try {
          const tx = db.transaction('audio_blobs', 'readonly');
          const store = tx.objectStore('audio_blobs');
          const req = store.get(key);
          req.onsuccess = () => resolve(req.result instanceof Blob ? req.result : null);
          req.onerror = () => resolve(null);
        } catch {
          resolve(null);
        }
      });
    } catch {
      return null;
    }
  }

  private async saveToIndexedDb(key: string, blob: Blob): Promise<void> {
    if (!this.idbPromise) return;
    try {
      const db = await this.idbPromise;
      if (!db) return;
      const tx = db.transaction('audio_blobs', 'readwrite');
      const store = tx.objectStore('audio_blobs');
      store.put(blob, key);
    } catch (e) {
      console.warn('Failed to save audio to IndexedDB:', e);
    }
  }

  /**
   * Stops current playback immediately.
   */
  stop(): void {
    if (this.currentAudioElement) {
      try {
        this.currentAudioElement.pause();
        this.currentAudioElement.removeAttribute('src');
        this.currentAudioElement.load();
      } catch {}
      this.currentAudioElement = null;
    }
    if (this.currentBlobUrl) {
      URL.revokeObjectURL(this.currentBlobUrl);
      this.currentBlobUrl = null;
    }
    if (this.currentAudioSource) {
      try {
        this.currentAudioSource.stop();
        this.currentAudioSource.disconnect();
      } catch {}
      this.currentAudioSource = null;
    }
    this.isSpeakingSubject.next(false);
    if (this.statusSubject.value === 'speaking') {
      this.statusSubject.next('ready');
    }
  }

  /**
   * Pauses audio playback.
   */
  pause(): void {
    if (this.currentAudioElement) {
      this.currentAudioElement.pause();
    }
    if (this.audioCtx && this.audioCtx.state === 'running') {
      this.audioCtx.suspend();
    }
  }

  /**
   * Resumes paused audio playback.
   */
  resume(): void {
    if (this.currentAudioElement) {
      this.currentAudioElement.play().catch(() => {});
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  private async playAudioBlob(blob: Blob): Promise<void> {
    this.stop();

    return new Promise((resolve, reject) => {
      try {
        const url = URL.createObjectURL(blob);
        this.currentBlobUrl = url;
        const audio = new Audio(url);
        this.currentAudioElement = audio;

        audio.onended = () => {
          this.stop();
          resolve();
        };

        audio.onerror = () => {
          console.warn('HTMLAudioElement error, falling back to AudioContext...');
          this.playAudioContextFallback(blob).then(resolve).catch(reject);
        };

        this.isSpeakingSubject.next(true);
        this.statusSubject.next('speaking');

        audio.play().catch((err) => {
          console.warn('Audio play() failed or blocked, falling back to AudioContext:', err);
          this.playAudioContextFallback(blob).then(resolve).catch(reject);
        });
      } catch (err) {
        this.playAudioContextFallback(blob).then(resolve).catch(reject);
      }
    });
  }

  private async playAudioContextFallback(blob: Blob): Promise<void> {
    const audioContext = this.getOrCreateAudioContext();
    if (audioContext.state === 'suspended') {
      await audioContext.resume();
    }

    const arrayBuffer = await blob.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

    return new Promise((resolve) => {
      const source = audioContext.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioContext.destination);

      source.onended = () => {
        if (this.currentAudioSource === source) {
          this.currentAudioSource = null;
          this.isSpeakingSubject.next(false);
          this.statusSubject.next('ready');
        }
        resolve();
      };

      this.currentAudioSource = source;
      this.isSpeakingSubject.next(true);
      this.statusSubject.next('speaking');
      source.start(0);
    });
  }

  private getOrCreateAudioContext(): AudioContext {
    if (!this.audioCtx) {
      const AudioCtxClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.audioCtx = new AudioCtxClass();
    }
    return this.audioCtx;
  }

  private setupWorker(): void {
    if (typeof Worker !== 'undefined') {
      try {
        this.worker = new Worker(new URL('./tts.worker', import.meta.url), {
          type: 'module',
        });

        this.worker.onmessage = ({ data }: MessageEvent<WorkerResponse>) => {
          this.handleWorkerMessage(data);
        };

        this.worker.onerror = (err) => {
          console.error('TTS Worker Error:', err);
          this.errorSubject.next('TTS Worker encountered an error.');
        };
      } catch (err) {
        console.warn('Could not spawn TTS Web Worker, falling back to main-thread inference:', err);
        this.worker = null;
      }
    }
  }

  private handleWorkerMessage(response: WorkerResponse): void {
    if (response.type === 'PROGRESS') {
      this.progressSubject.next(response.progress);
      return;
    }

    const pending = this.pendingRequests.get(response.id);
    if (!pending) return;

    this.pendingRequests.delete(response.id);

    if (response.type === 'ERROR') {
      pending.reject(new Error(response.error));
    } else {
      pending.resolve(response);
    }
  }

  private sendWorkerRequest<T extends WorkerResponse>(request: WorkerRequest): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      if (!this.worker) {
        reject(new Error('Worker is not available'));
        return;
      }

      this.pendingRequests.set(request.id, {
        resolve: resolve as (value: WorkerResponse) => void,
        reject,
      });

      this.worker.postMessage(request);
    });
  }

  private generateRequestId(): string {
    return `req_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  }
}
