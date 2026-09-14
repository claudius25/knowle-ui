import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { Router } from '@angular/router';
import { TortiComponent } from './characters/torti/torti.component';
import { TortiCharacter } from './characters/torti/torti-character';
import { TortiPose } from './characters/torti/torti.types';
import { Language, LanguageService } from './shared/services/language.service';
import { TtsService } from './shared/tts/tts.service';
import { IntroService } from './shared/services/intro.service';
import { UiTextService } from './shared/services/ui-text.service';

const HAPPY_POSES: readonly TortiPose[] = [
  'happy',
  'wave',
  'heart',
  'thumbs-up',
  'gotyou',
  'elvis',
  'tennis',
  'jako',
];

const HAPPY_PHRASES: Record<Language, readonly string[]> = {
  ro: [
    'Bravo tie!',
    'Esti grozav!',
    'Hai sa invatam ceva nou!',
    'Imi place energia ta!',
    'Sa continuam aventura!',
  ],
  en: [
    'You rock!',
    'Great to see you!',
    "Let's learn something new!",
    'I love your energy!',
    "Let's keep exploring!",
  ],
};

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TortiComponent],
  templateUrl: './home.component.html',
  styleUrl: './app.css',
})
export class HomeComponent implements OnDestroy, OnInit {
  @ViewChild('homeTitle') private readonly homeTitle?: ElementRef<HTMLHeadingElement>;

  private readonly languageService = inject(LanguageService);
  private readonly router = inject(Router);
  private readonly tts = inject(TtsService);
  private readonly introService = inject(IntroService);
  protected readonly uiText = inject(UiTextService);
  private resizeObserver?: ResizeObserver;
  private lastHeaderWidth = 0;

  protected selectedLanguage: Language | null = this.languageService.getStoredLanguage();
  protected tortiSpeech = '';
  protected tortiShowBubble = false;
  protected showIntroButton = !this.introService.hasSeenIntro();

  ngOnInit(): void {
    // Preload TTS models/voices in the background so the game doesn't have to wait for them.
    this.tts.init().catch(() => {});
    this.tts.loadVoice('M1').catch(() => {});
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
    this.tts.stop();
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

  protected goToIntro(): void {
    this.router.navigate(['/intro']);
  }

  protected async onTortiClick(character: TortiCharacter): Promise<void> {
    const pose = HAPPY_POSES[Math.floor(Math.random() * HAPPY_POSES.length)];
    character.setPose(pose);

    const language = this.selectedLanguage ?? this.languageService.getCurrentLanguage();
    const phrases = HAPPY_PHRASES[language];
    this.tortiSpeech = phrases[Math.floor(Math.random() * phrases.length)];
    this.tortiShowBubble = true;
    character.startTalking();

    try {
      await this.tts.speak(this.tortiSpeech, { lang: language });
    } finally {
      character.stopTalking();
      this.tortiShowBubble = false;
    }
  }
}
