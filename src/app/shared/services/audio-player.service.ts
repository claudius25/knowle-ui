import { Injectable, OnDestroy, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Language, LanguageService } from './language.service';

export interface PlayAudioKeyOptions {
  difficulty?: string;
  domain?: string;
  lang?: Language;
  format?: 'webm' | 'mp3' | 'ogg' | 'wav';
}

@Injectable({ providedIn: 'root' })
export class AudioPlayerService implements OnDestroy {
  private readonly languageService = inject(LanguageService);

  private readonly isPlayingSubject = new BehaviorSubject<boolean>(false);
  private readonly currentKeySubject = new BehaviorSubject<string | null>(null);

  readonly isPlaying$: Observable<boolean> = this.isPlayingSubject.asObservable();
  readonly currentKey$: Observable<string | null> = this.currentKeySubject.asObservable();

  private currentAudio: HTMLAudioElement | null = null;
  private queue: string[] = [];
  private currentPlayPromise: Promise<void> | null = null;

  get isPlaying(): boolean {
    return this.isPlayingSubject.value;
  }

  get currentKey(): string | null {
    return this.currentKeySubject.value;
  }

  ngOnDestroy(): void {
    this.stop();
  }

  /**
   * Resolves the URL for an audio file given a key, language, domain, and difficulty.
   * Defaults to .webm (Opus), supporting .mp3 or others via options.format.
   * e.g. /db/easy/geography/audio/easy_geo_1_desc_ro.webm
   */
  getAudioUrl(key: string, options?: PlayAudioKeyOptions): string {
    const diff = (options?.difficulty || 'easy').toLowerCase();
    const dom = (options?.domain || 'geography').toLowerCase();
    const lang = options?.lang || this.languageService.getCurrentLanguage() || 'ro';
    const ext = options?.format || 'webm';
    return `/db/${diff}/${dom}/audio/${key}_${lang}.${ext}`;
  }

  /**
   * Plays a single pre-generated audio file by its translation key.
   */
  async playKey(key: string, options?: PlayAudioKeyOptions): Promise<void> {
    const url = this.getAudioUrl(key, options);
    return this.playUrl(url, key);
  }

  /**
   * Plays a sequence of translation keys consecutively (e.g. description then question).
   */
  async playKeys(keys: string[], options?: PlayAudioKeyOptions): Promise<void> {
    this.stop();
    if (!keys || keys.length === 0) return;

    const urls = keys.map((k) => this.getAudioUrl(k, options));
    const combinedKey = keys.join('+');

    this.isPlayingSubject.next(true);
    this.currentKeySubject.next(combinedKey);

    try {
      for (const url of urls) {
        if (!this.isPlayingSubject.value) {
          break; // Stop if interrupted
        }
        await this.playSingleUrl(url);
      }
    } catch (err) {
      console.warn('[AudioPlayer] Error playing audio sequence:', err);
    } finally {
      this.isPlayingSubject.next(false);
      this.currentKeySubject.next(null);
    }
  }

  /**
   * Plays a direct audio URL.
   */
  async playUrl(url: string, keyIdentifier?: string): Promise<void> {
    this.stop();

    this.isPlayingSubject.next(true);
    this.currentKeySubject.next(keyIdentifier ?? url);

    try {
      await this.playSingleUrl(url);
    } catch (err) {
      console.warn('[AudioPlayer] Error playing audio file:', url, err);
    } finally {
      this.isPlayingSubject.next(false);
      this.currentKeySubject.next(null);
    }
  }

  private playSingleUrl(url: string): Promise<void> {
    return new Promise((resolve) => {
      const audio = new Audio(url);
      this.currentAudio = audio;

      audio.onended = () => {
        this.currentAudio = null;
        resolve();
      };

      audio.onerror = (e) => {
        console.warn(`[AudioPlayer] Failed to load audio from ${url}:`, e);
        this.currentAudio = null;
        resolve();
      };

      audio.play().catch((err) => {
        console.warn(`[AudioPlayer] Autoplay blocked or failed for ${url}:`, err);
        this.currentAudio = null;
        resolve();
      });
    });
  }

  /**
   * Stops any currently playing audio immediately.
   */
  stop(): void {
    if (this.currentAudio) {
      try {
        this.currentAudio.pause();
        this.currentAudio.removeAttribute('src');
        this.currentAudio.load();
      } catch {}
      this.currentAudio = null;
    }
    this.isPlayingSubject.next(false);
    this.currentKeySubject.next(null);
  }
}
