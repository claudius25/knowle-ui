import { Injectable, inject } from '@angular/core';
import { Language, LanguageService } from './language.service';
import { UiTextKey, uiText } from '../i18n/ui-translations';

@Injectable({ providedIn: 'root' })
export class UiTextService {
  private readonly languageService = inject(LanguageService);

  /**
   * In-memory cache for dynamically loaded global translations per language.
   */
  private readonly loadedTranslations = new Map<Language, Record<string, string>>();
  private readonly loadingPromises = new Map<Language, Promise<Record<string, string>>>();

  constructor() {
    // Preload for the initial language
    void this.loadTranslations(this.languageService.getCurrentLanguage());

    // Listen for language switch and load the corresponding dictionary
    this.languageService.languageChanged$.subscribe((lang) => {
      void this.loadTranslations(lang);
    });
  }

  /**
   * Asynchronously loads the global UI translations from /i18n/{lang}.json
   */
  async loadTranslations(lang: Language): Promise<Record<string, string>> {
    if (this.loadedTranslations.has(lang)) {
      return this.loadedTranslations.get(lang)!;
    }

    if (this.loadingPromises.has(lang)) {
      return this.loadingPromises.get(lang)!;
    }

    const loadPromise = (async () => {
      try {
        const response = await fetch(`/i18n/${lang}.json`);
        if (!response.ok) {
          throw new Error(`Failed to fetch translations for ${lang}: ${response.statusText}`);
        }
        const data = (await response.json()) as Record<string, string>;
        this.loadedTranslations.set(lang, data);
        return data;
      } catch (err) {
        console.warn(`[i18n] Could not load /i18n/${lang}.json, using built-in fallbacks:`, err);
        return {};
      } finally {
        this.loadingPromises.delete(lang);
      }
    })();

    this.loadingPromises.set(lang, loadPromise);
    return loadPromise;
  }

  /**
   * Retrieves the translated string for the given key in the active language.
   * Checks the dynamically loaded JSON dictionary first, then falls back to static dictionary.
   */
  text(key: UiTextKey | string, fallback?: string): string {
    const currentLang = this.languageService.getCurrentLanguage();
    const dictionary = this.loadedTranslations.get(currentLang);

    if (dictionary && key in dictionary) {
      return dictionary[key];
    }

    // Fallback to built-in dictionary
    const fallbackText = uiText(currentLang, key as UiTextKey);
    if (fallbackText !== undefined && fallbackText !== key) {
      return fallbackText;
    }

    return fallback ?? key;
  }
}
