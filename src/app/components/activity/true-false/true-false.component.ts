import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { TrueFalseActivityData } from '../../../shared/models/game.types';
import { UiTextService } from '../../../shared/services/ui-text.service';
import { TortiComponent } from '../../../characters/torti/torti.component';
import { TortiPose } from '../../../characters/torti/torti.types';

@Component({
  selector: 'app-true-false',
  standalone: true,
  imports: [TortiComponent],
  templateUrl: './true-false.component.html',
  styleUrl: './true-false.component.css',
})
export class TrueFalseComponent {
  protected readonly uiText = inject(UiTextService);
  @Input({ required: true }) data!: TrueFalseActivityData;
  @Input() disabled = false;
  @Input() selectedAnswer: boolean | null = null;
  @Input() characterPose: TortiPose = 'idle';
  @Input() characterSpeech = '';
  @Output() answerSelected = new EventEmitter<boolean>();

  protected select(answer: boolean): void {
    if (!this.disabled) {
      this.answerSelected.emit(answer);
    }
  }
}
