import { Injectable, inject } from '@angular/core';
import { LanguageService } from './language.service';
import { UiTextKey, uiText } from '../i18n/ui-translations';

@Injectable({ providedIn: 'root' })
export class UiTextService {
  private readonly languageService = inject(LanguageService);

  text(key: UiTextKey): string {
    return uiText(this.languageService.getCurrentLanguage(), key);
  }
}
