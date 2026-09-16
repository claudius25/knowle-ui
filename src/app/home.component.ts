import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { GButtonComponent } from './shared/components/g-button/g-button.component';
import { Router } from '@angular/router';
import { TortiComponent } from './characters/torti/torti.component';
import { TortiCharacter } from './characters/torti/torti-character';
import { TortiPose } from './characters/torti/torti.types';
import { Language, LanguageService } from './shared/services/language.service';
import { IntroService } from './shared/services/intro.service';
import { UiTextService } from './shared/services/ui-text.service';
import { AudioPlayerService } from './shared/services/audio-player.service';
import { TORTI_HAPPY_LINES, pickRandomLine } from './characters/torti/torti-speech.constants';

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

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TortiComponent, GButtonComponent],
  templateUrl: './home.component.html',
  styleUrl: './app.css',
})
export class HomeComponent implements OnDestroy, OnInit {
  @ViewChild('homeTitle') private readonly homeTitle?: ElementRef<HTMLHeadingElement>;

  private readonly languageService = inject(LanguageService);
  private readonly router = inject(Router);
  private readonly introService = inject(IntroService);
  private readonly audioPlayer = inject(AudioPlayerService);
  protected readonly uiText = inject(UiTextService);
  private resizeObserver?: ResizeObserver;
  private lastHeaderWidth = 0;
  private speechTimeout?: number;

  protected selectedLanguage: Language | null = this.languageService.getStoredLanguage();
  protected tortiSpeech = '';
  protected tortiShowBubble = false;

  ngOnInit(): void {}

  protected text(key: Parameters<UiTextService['text']>[0]): string {
    return this.uiText.text(key);
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
    this.audioPlayer.stop();
    window.clearTimeout(this.speechTimeout);
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

  protected goToAdmin(): void {
    this.router.navigate(['/admin']);
  }

  protected onTortiClick(character: TortiCharacter): void {
    const pose = HAPPY_POSES[Math.floor(Math.random() * HAPPY_POSES.length)];
    character.setPose(pose);

    const language = this.selectedLanguage ?? this.languageService.getCurrentLanguage();
    const lineKey = pickRandomLine(TORTI_HAPPY_LINES);
    this.tortiSpeech = this.uiText.text(lineKey);
    this.tortiShowBubble = true;
    character.startTalking();

    window.clearTimeout(this.speechTimeout);

    void this.audioPlayer.playKey(lineKey, { global: true, lang: language }).then(() => {
      character.stopTalking();
      this.tortiShowBubble = false;
    });

    this.speechTimeout = window.setTimeout(() => {
      character.stopTalking();
      this.tortiShowBubble = false;
    }, 4000);
  }
}
