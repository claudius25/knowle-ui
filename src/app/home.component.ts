import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild, inject } from '@angular/core';
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
export class HomeComponent implements AfterViewInit, OnDestroy {
  @ViewChild('homeTitle') private readonly homeTitle?: ElementRef<HTMLHeadingElement>;

  private readonly languageService = inject(LanguageService);
  private readonly router = inject(Router);
  private resizeObserver?: ResizeObserver;
  private lastHeaderWidth = 0;

  protected selectedLanguage: Language | null = this.languageService.getStoredLanguage();
  protected titleFontSize = 0;

  ngAfterViewInit(): void {
    this.resizeObserver = new ResizeObserver(() => this.fitTitleToViewport());
    this.resizeObserver.observe(this.homeTitle?.nativeElement.parentElement ?? document.body);
    this.fitTitleToViewport(true);
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
  }

  private fitTitleToViewport(force = false): void {
    const title = this.homeTitle?.nativeElement;
    const header = title?.parentElement;
    if (!title || !header) {
      return;
    }

    const availableWidth = header.clientWidth;
    if (!force && availableWidth === this.lastHeaderWidth) {
      return;
    }

    this.lastHeaderWidth = availableWidth;
    const maxFontSize = Math.min(window.innerWidth * 0.1, 99.2);
    title.style.fontSize = `${maxFontSize}px`;

    if (title.scrollWidth > header.clientWidth) {
      this.titleFontSize = Math.max(28, maxFontSize * (availableWidth / title.scrollWidth) * 0.96);
    } else {
      this.titleFontSize = maxFontSize;
    }

    title.style.fontSize = `${this.titleFontSize}px`;
  }

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
