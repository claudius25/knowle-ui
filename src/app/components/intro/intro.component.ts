import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UiTextService } from '../../shared/services/ui-text.service';
import { IntroService } from '../../shared/services/intro.service';

interface IntroPage {
  titleKey: 'introPage1Title' | 'introPage2Title' | 'introPage3Title';
  bodyKey: 'introPage1Body' | 'introPage2Body' | 'introPage3Body';
}

const INTRO_PAGES: readonly IntroPage[] = [
  { titleKey: 'introPage1Title', bodyKey: 'introPage1Body' },
  { titleKey: 'introPage2Title', bodyKey: 'introPage2Body' },
  { titleKey: 'introPage3Title', bodyKey: 'introPage3Body' },
];

@Component({
  selector: 'app-intro',
  standalone: true,
  templateUrl: './intro.component.html',
  styleUrl: './intro.component.css',
})
export class IntroComponent {
  protected readonly uiText = inject(UiTextService);
  private readonly introService = inject(IntroService);
  private readonly router = inject(Router);

  protected readonly pages = INTRO_PAGES;
  protected currentIndex = 0;

  protected get isLastPage(): boolean {
    return this.currentIndex === this.pages.length - 1;
  }

  protected goTo(index: number): void {
    this.currentIndex = index;
  }

  protected next(): void {
    if (this.isLastPage) {
      this.finish();
      return;
    }
    this.currentIndex++;
  }

  protected skip(): void {
    this.finish();
  }

  private finish(): void {
    this.introService.markIntroSeen();
    this.router.navigate(['/game']);
  }
}
