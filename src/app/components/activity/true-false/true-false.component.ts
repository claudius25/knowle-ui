import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { TrueFalseActivityData } from '../../../shared/models/game.types';
import { UiTextService } from '../../../shared/services/ui-text.service';
import { AudioPlayerService } from '../../../shared/services/audio-player.service';

@Component({
  selector: 'app-true-false',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './true-false.component.html',
  styleUrl: './true-false.component.css',
})
export class TrueFalseComponent {
  protected readonly uiText = inject(UiTextService);
  private readonly audioPlayer = inject(AudioPlayerService);

  @Input({ required: true }) data!: TrueFalseActivityData;
  @Input() disabled = false;
  @Input() selectedAnswer: boolean | null = null;
  @Output() answerSelected = new EventEmitter<boolean>();

  protected readonly isSpeaking$ = this.audioPlayer.isPlaying$;

  protected select(answer: boolean): void {
    if (!this.disabled) {
      this.answerSelected.emit(answer);
    }
  }

  protected speak(): void {
    if (this.audioPlayer.isPlaying) {
      this.audioPlayer.stop();
      return;
    }

    const keys: string[] = [];
    if (this.data.descriptionKey) {
      keys.push(this.data.descriptionKey);
    }
    if (this.data.questionKey) {
      keys.push(this.data.questionKey);
    }

    if (keys.length > 0) {
      void this.audioPlayer.playKeys(keys);
    }
  }
}
