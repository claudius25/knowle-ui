import { Component, inject } from '@angular/core';
import { GameComponent } from './components/game/game.component';
import { TortiComponent } from './characters/torti/torti.component';
import { Language, LanguageService } from './shared/services/language.service';

@Component({
  selector: 'app-root',
  imports: [GameComponent, TortiComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private readonly languageService = inject(LanguageService);

  protected showGame = false;
  protected selectedLanguage: Language | null = this.languageService.getStoredLanguage();

  protected selectLanguage(language: Language): void {
    this.languageService.setLanguage(language);
    this.selectedLanguage = language;
  }

  protected startGame(): void {
    if (this.selectedLanguage) {
      this.showGame = true;
    }
  }
}
