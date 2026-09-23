import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { GButtonComponent } from '../../shared/components/g-button/g-button.component';
import { MatBottomSheet, MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { TortiComponent } from '../../characters/torti/torti.component';
import { TortiPose } from '../../characters/torti/torti.types';
import { ChapterButtonComponent } from '../ui/chapter-button/chapter-button.component';
import { ActivityModel } from '../../shared/models/activities';
import { GameService } from '../../shared/services/game.service';

@Component({
  selector: 'app-game-footer',
  standalone: true,
  imports: [TortiComponent, ChapterButtonComponent, GButtonComponent, MatBottomSheetModule],
  templateUrl: './game-footer.component.html',
  styleUrl: './game-footer.component.css',
})
export class GameFooterComponent {
  @Input() activity: ActivityModel | null = null;
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

  protected readonly game = inject(GameService);
  private _bottomSheet: MatBottomSheet = inject(MatBottomSheet);

  @Output() continue = new EventEmitter<void>();
  @Output() retry = new EventEmitter<void>();
  @Output() chapter = new EventEmitter<void>();
  @Output() check = new EventEmitter<void>();
}
