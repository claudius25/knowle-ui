import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { TrueFalseActivityData } from '../../shared/models/game.types';
import { UiTextService } from '../../shared/services/ui-text.service';

@Component({
  selector: 'app-true-false',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './true-false.component.html',
  styleUrl: './true-false.component.css',
})
export class TrueFalseComponent {
  protected readonly uiText = inject(UiTextService);
  @Input({ required: true }) data!: TrueFalseActivityData;
  @Input() disabled = false;
  @Input() selectedAnswer: boolean | null = null;
  @Output() answerSelected = new EventEmitter<boolean>();

  protected select(answer: boolean): void {
    if (!this.disabled) {
      this.answerSelected.emit(answer);
    }
  }
}
