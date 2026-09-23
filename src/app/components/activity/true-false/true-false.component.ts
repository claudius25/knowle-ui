import { Component, Input, OnChanges, SimpleChanges, inject } from '@angular/core';
import { TrueFalseActivityModel } from '../../../shared/models/activities';
import { ChapterService } from '../../../shared/services/chapter.service';
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
  protected readonly chapter = inject(ChapterService);

  @Input({ required: true }) activity!: TrueFalseActivityModel;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['activity'] && this.activity) {
      this.activity.setLabels(this.uiText.text('trueLabel'), this.uiText.text('falseLabel'));
    }
  }
}
