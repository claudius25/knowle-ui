import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TortiComponent } from '../../characters/torti/torti.component';
import { CoinDisplayComponent } from '../ui/coin-display/coin-display.component';
import { HealthDisplayComponent } from '../ui/health-display/health-display.component';
import { UiTextService } from '../../shared/services/ui-text.service';
import { LanguageService } from '../../shared/services/language.service';

@Component({
  selector: 'app-chapter-done',
  standalone: true,
  imports: [TortiComponent, CoinDisplayComponent, HealthDisplayComponent],
  templateUrl: './chapter-done.component.html',
  styleUrl: './chapter-done.component.css',
})
export class ChapterDoneComponent {
  private readonly router = inject(Router);
  protected readonly uiText = inject(UiTextService);
  private readonly languageService = inject(LanguageService);

  protected readonly coins = history.state?.coins ?? 100;
  protected readonly health = history.state?.health ?? 100;
  protected readonly chapterTitle = history.state?.chapterTitle ?? '';

  protected get speechBubble(): string {
    const isRo = this.languageService.getCurrentLanguage() === 'ro';
    return isRo
      ? 'Felicitări! Ai terminat toate activitățile din acest capitol!'
      : 'Congratulations! You completed all activities in this chapter!';
  }

  protected goHome(): void {
    this.router.navigate(['/']);
  }

  protected playAgain(): void {
    this.router.navigate(['/game']);
  }
}
