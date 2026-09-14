import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { MultipleChoiceActivityData } from '../../../shared/models/game.types';
import { UiTextService } from '../../../shared/services/ui-text.service';
import { TortiComponent } from '../../../characters/torti/torti.component';
import { TortiPose } from '../../../characters/torti/torti.types';

@Component({
  selector: 'app-multiple-choice',
  standalone: true,
  imports: [TortiComponent],
  templateUrl: './multiple-choice.component.html',
  styleUrl: './multiple-choice.component.css',
})
export class MultipleChoiceComponent {
  protected readonly uiText = inject(UiTextService);
  @Input({ required: true }) data!: MultipleChoiceActivityData;
  @Input() disabled = false;
  @Input() selectedAnswer: string | null = null;
  @Input() characterPose: TortiPose = 'idle';
  @Input() characterSpeech = '';
  @Output() answerSelected = new EventEmitter<string>();

  protected select(answer: string): void {
    if (!this.disabled) {
      this.answerSelected.emit(answer);
    }
  }
}
