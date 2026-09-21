import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GButtonComponent } from '../../shared/components/g-button/g-button.component';
import { TortiComponent } from '../../characters/torti/torti.component';
import { TortiPose } from '../../characters/torti/torti.types';
import { ChapterButtonComponent } from '../ui/chapter-button/chapter-button.component';
import { TryAgainButtonComponent } from '../ui/try-again-button/try-again-button.component';
import { CoinDisplayComponent } from '../ui/coin-display/coin-display.component';
import { HealthDisplayComponent } from '../ui/health-display/health-display.component';

@Component({
  selector: 'app-game-footer',
  standalone: true,
  imports: [
    TortiComponent,
    ChapterButtonComponent,
    TryAgainButtonComponent,
    GButtonComponent,
    CoinDisplayComponent,
    HealthDisplayComponent,
  ],
  templateUrl: './game-footer.component.html',
  styleUrl: './game-footer.component.css',
})
export class GameFooterComponent {
  @Input() mode:
    | 'waiting'
    | 'checking'
    | 'correct'
    | 'incorrect'
    | 'classify'
    | 'matching'
    | 'ordering' = 'waiting';
  @Input() sessionComplete = false;
  @Input() classifyComplete = false;
  @Input() disabled = false;
  @Input() checkingText = 'Checking...';
  @Input() continueText = 'Continue';
  @Input() chapterText = 'Chapter complete';
  @Input() retryText = 'Retry';
  @Input() checkText = 'Check';
  @Input() characterPose: TortiPose = 'idle';
  @Input() characterSpeech = '';
  @Input() health = 100;
  @Input() coins = 0;

  @Output() continue = new EventEmitter<void>();
  @Output() retry = new EventEmitter<void>();
  @Output() fifty = new EventEmitter<void>();
  @Output() hint = new EventEmitter<void>();
  @Output() chapter = new EventEmitter<void>();
  @Output() check = new EventEmitter<void>();
}
