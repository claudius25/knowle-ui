import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  inject,
} from '@angular/core';
import {
  MultipleChoiceActivityData,
  TrueFalseActivityData,
} from '../../../shared/models/game.types';
import { UiTextService } from '../../../shared/services/ui-text.service';
import { MultipleChoiceComponent } from '../multiple-choice/multiple-choice.component';

@Component({
  selector: 'app-true-false',
  standalone: true,
  imports: [MultipleChoiceComponent],
  templateUrl: './true-false.component.html',
})
export class TrueFalseComponent implements OnChanges {
  private readonly uiText = inject(UiTextService);

  @Input({ required: true }) data!: TrueFalseActivityData;
  @Input() disabled = false;
  @Input() selectedAnswer: boolean | null = null;
  @Input() answerState: 'correct' | 'incorrect' | null = null;
  @Output() answerSelected = new EventEmitter<boolean>();

  protected choiceData!: MultipleChoiceActivityData;
  private trueLabel = '';

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['data']) {
      return;
    }

    this.trueLabel = this.uiText.text('trueLabel');
    this.choiceData = {
      ...this.data,
      options: [this.trueLabel, this.uiText.text('falseLabel')],
    };
  }

  protected get selectedOption(): string | null {
    if (this.selectedAnswer === null) {
      return null;
    }
    return this.choiceData.options[this.selectedAnswer ? 0 : 1];
  }

  protected handleSelection(option: string): void {
    this.answerSelected.emit(option === this.trueLabel);
  }
}
