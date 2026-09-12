import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TortiComponent } from './characters/torti/torti.component';
import { Language, LanguageService } from './shared/services/language.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TortiComponent],
  templateUrl: './home.component.html',
  styleUrl: './app.css',
})
export class HomeComponent {
  private readonly languageService = inject(LanguageService);
  private readonly router = inject(Router);

  protected selectedLanguage: Language | null = this.languageService.getStoredLanguage();

  protected selectLanguage(language: Language): void {
    this.languageService.setLanguage(language);
    this.selectedLanguage = language;
  }

  protected startGame(): void {
    if (this.selectedLanguage) {
      this.router.navigate(['/game']);
    }
  }
}
