import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TortiComponent } from '../../characters/torti/torti.component';
import { TortiPose } from '../../characters/torti/torti.types';
import { ChapterButtonComponent } from '../ui/chapter-button/chapter-button.component';
import { CheckButtonComponent } from '../ui/check-button/check-button.component';
import { ContinueButtonComponent } from '../ui/continue-button/continue-button.component';
import { TryAgainButtonComponent } from '../ui/try-again-button/try-again-button.component';

@Component({
  selector: 'app-game-footer',
  standalone: true,
  imports: [
    TortiComponent,
    ChapterButtonComponent,
    ContinueButtonComponent,
    TryAgainButtonComponent,
    CheckButtonComponent,
  ],
  templateUrl: './game-footer.component.html',
  styleUrl: './game-footer.component.css',
})
export class GameFooterComponent {
  @Input() mode: 'waiting' | 'checking' | 'correct' | 'incorrect' | 'classify' = 'waiting';
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

  @Output() continue = new EventEmitter<void>();
  @Output() retry = new EventEmitter<void>();
  @Output() chapter = new EventEmitter<void>();
  @Output() check = new EventEmitter<void>();
}
