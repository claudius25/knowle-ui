import { Injectable, OnDestroy, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Language, LanguageService } from './language.service';

export interface PlayAudioKeyOptions {
  difficulty?: string;
  domain?: string;
  lang?: Language;
  format?: 'webm' | 'mp3' | 'ogg' | 'wav';
  global?: boolean;
  /** Marks this playback as a character (e.g. Torti) spoken line, subject to `characterMuted`. */
  characterSpeech?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AudioPlayerService implements OnDestroy {
  private readonly languageService = inject(LanguageService);
  private static readonly MUTE_STORAGE_KEY = 'gnosy_audio_muted';
  private static readonly CHARACTER_MUTE_STORAGE_KEY = 'gnosy_character_audio_muted';

  private readonly isPlayingSubject = new BehaviorSubject<boolean>(false);
  private readonly currentKeySubject = new BehaviorSubject<string | null>(null);
  private readonly mutedSubject = new BehaviorSubject<boolean>(this.readStoredMute());
  private readonly characterMutedSubject = new BehaviorSubject<boolean>(
    this.readStoredMute(AudioPlayerService.CHARACTER_MUTE_STORAGE_KEY),
  );

  readonly isPlaying$: Observable<boolean> = this.isPlayingSubject.asObservable();
  readonly currentKey$: Observable<string | null> = this.currentKeySubject.asObservable();
  readonly muted$: Observable<boolean> = this.mutedSubject.asObservable();
  readonly characterMuted$: Observable<boolean> = this.characterMutedSubject.asObservable();

  private currentAudio: HTMLAudioElement | null = null;
  private queue: string[] = [];
  private currentPlayPromise: Promise<void> | null = null;

  get isPlaying(): boolean {
    return this.isPlayingSubject.value;
  }

  get currentKey(): string | null {
    return this.currentKeySubject.value;
  }

  get muted(): boolean {
    return this.mutedSubject.value;
  }

  get characterMuted(): boolean {
    return this.characterMutedSubject.value;
  }

  setMuted(muted: boolean): void {
    this.mutedSubject.next(muted);
    try {
      localStorage.setItem(AudioPlayerService.MUTE_STORAGE_KEY, muted ? '1' : '0');
    } catch {
      // localStorage unavailable (e.g. private mode) - mute preference just won't persist.
    }
    if (muted) {
      this.stop();
    }
  }

  toggleMute(): void {
    this.setMuted(!this.muted);
  }

  /** Mutes only the character's (e.g. Torti) spoken lines; quiz/UI audio keeps playing. */
  setCharacterMuted(muted: boolean): void {
    this.characterMutedSubject.next(muted);
    try {
      localStorage.setItem(AudioPlayerService.CHARACTER_MUTE_STORAGE_KEY, muted ? '1' : '0');
    } catch {
      // localStorage unavailable (e.g. private mode) - mute preference just won't persist.
    }
    if (muted && this.currentIsCharacterSpeech) {
      this.stop();
    }
  }

  toggleCharacterMute(): void {
    this.setCharacterMuted(!this.characterMuted);
  }

  private currentIsCharacterSpeech = false;

  private readStoredMute(key: string = AudioPlayerService.MUTE_STORAGE_KEY): boolean {
    try {
      return localStorage.getItem(key) === '1';
    } catch {
      return false;
    }
  }

  ngOnDestroy(): void {
    this.stop();
  }

  /**
   * Resolves the URL for an audio file given a key, language, domain, and difficulty.
   * Defaults to .webm (Opus), supporting .mp3 or others via options.format.
   * e.g. /db/easy/geography/audio/easy_geo_1_desc_ro.webm or /audio/happyLine1_ro.webm
   */
  getAudioUrl(key: string, options?: PlayAudioKeyOptions): string {
    const lang = options?.lang || this.languageService.getCurrentLanguage() || 'ro';
    const ext = options?.format || 'webm';
    if (options?.global) {
      return `/audio/${key}_${lang}.${ext}`;
    }
    const diff = (options?.difficulty || 'easy').toLowerCase();
    const dom = (options?.domain || 'geography').toLowerCase();
    return `/db/${diff}/${dom}/audio/${key}_${lang}.${ext}`;
  }

  /**
   * Plays a single pre-generated audio file by its translation key.
   */
  async playKey(key: string, options?: PlayAudioKeyOptions): Promise<void> {
    if (this.muted || (options?.characterSpeech && this.characterMuted)) return;
    const url = this.getAudioUrl(key, options);
    return this.playUrl(url, key, options?.characterSpeech);
  }

  /**
   * Plays a sequence of translation keys consecutively (e.g. description then question).
   */
  async playKeys(keys: string[], options?: PlayAudioKeyOptions): Promise<void> {
    this.stop();
    if (!keys || keys.length === 0 || this.muted) return;
    if (options?.characterSpeech && this.characterMuted) return;

    const urls = keys.map((k) => this.getAudioUrl(k, options));
    const combinedKey = keys.join('+');

    this.currentIsCharacterSpeech = !!options?.characterSpeech;
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
  async playUrl(url: string, keyIdentifier?: string, characterSpeech = false): Promise<void> {
    this.stop();
    if (this.muted || (characterSpeech && this.characterMuted)) return;

    this.currentIsCharacterSpeech = characterSpeech;
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
    this.currentIsCharacterSpeech = false;
    this.isPlayingSubject.next(false);
    this.currentKeySubject.next(null);
  }
}
