import { Component, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { Language, LanguageService } from '../../../shared/services/language.service';
import { UiTextService } from '../../../shared/services/ui-text.service';

@Component({
  selector: 'app-language-selector',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule],
  templateUrl: './language-selector.component.html',
  styleUrl: './language-selector.component.css',
})
export class LanguageSelectorComponent {
  private readonly languageService = inject(LanguageService);
  protected readonly uiText = inject(UiTextService);

  protected readonly languages = [
    { code: 'ro' as Language, flag: '🇷🇴', label: 'Română', shortLabel: 'RO' },
    { code: 'en' as Language, flag: '🇬🇧', label: 'English', shortLabel: 'EN' },
  ];

  protected get currentLanguage(): Language {
    return this.languageService.getCurrentLanguage();
  }

  protected selectLanguage(language: string): void {
    this.languageService.setLanguage(language);
  }
}
