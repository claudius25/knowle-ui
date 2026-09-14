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
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { ClassifyActivityData, ClassifyItem } from '../../../shared/models/game.types';
import { UiTextService } from '../../../shared/services/ui-text.service';
import { TortiComponent } from '../../../characters/torti/torti.component';
import { TortiPose } from '../../../characters/torti/torti.types';

@Component({
  selector: 'app-classify',
  standalone: true,
  imports: [TortiComponent, CdkDropListGroup, CdkDropList, CdkDrag],
  templateUrl: './classify.component.html',
  styleUrl: './classify.component.css',
})
export class ClassifyComponent implements OnChanges {
  protected readonly uiText = inject(UiTextService);
  @Input({ required: true }) data!: ClassifyActivityData;
  @Input() disabled = false;
  @Input() characterPose: TortiPose = 'idle';
  @Input() characterSpeech = '';
  @Output() answerSubmitted = new EventEmitter<Record<string, string>>();

  protected pool: ClassifyItem[] = [];
  protected categoryItems: Record<string, ClassifyItem[]> = {};

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.pool = [...this.data.items];
      this.categoryItems = Object.fromEntries(
        this.data.categories.map((category) => [category.id, [] as ClassifyItem[]]),
      );
    }
  }

  protected drop(event: CdkDragDrop<ClassifyItem[]>): void {
    if (this.disabled) {
      return;
    }

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      return;
    }

    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex,
    );
  }

  get isComplete(): boolean {
    return this.pool.length === 0;
  }

  submit(): void {
    if (this.disabled || !this.isComplete) {
      return;
    }

    const selections: Record<string, string> = {};
    for (const [categoryId, items] of Object.entries(this.categoryItems)) {
      for (const item of items) {
        selections[item.id] = categoryId;
      }
    }
    this.answerSubmitted.emit(selections);
  }
}
