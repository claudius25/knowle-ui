import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type Language = 'ro' | 'en';

const STORAGE_KEY = 'knowle-language';
const SUPPORTED_LANGUAGES: readonly Language[] = ['ro', 'en'];

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly languageSubject = new BehaviorSubject<Language>(this.readStoredLanguage());

  readonly languageChanged$ = this.languageSubject.asObservable();

  getCurrentLanguage(): Language {
    return this.languageSubject.value;
  }

  setLanguage(language: string): void {
    if (!this.isSupported(language) || language === this.getCurrentLanguage()) {
      return;
    }

    localStorage.setItem(STORAGE_KEY, language);
    this.languageSubject.next(language);
  }

  private readStoredLanguage(): Language {
    const storedLanguage = localStorage.getItem(STORAGE_KEY);
    return storedLanguage && this.isSupported(storedLanguage) ? storedLanguage : 'ro';
  }

  private isSupported(language: string): language is Language {
    return SUPPORTED_LANGUAGES.includes(language as Language);
  }
}
