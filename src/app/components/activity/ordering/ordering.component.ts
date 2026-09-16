import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { OrderingActivityData, OrderingItem } from '../../../shared/models/game.types';
import { UiTextService } from '../../../shared/services/ui-text.service';

@Component({
  selector: 'app-ordering',
  standalone: true,
  imports: [CommonModule, CdkDropList, CdkDrag],
  templateUrl: './ordering.component.html',
  styleUrl: './ordering.component.css',
})
export class OrderingComponent implements OnChanges {
  protected readonly uiText = inject(UiTextService);

  @Input({ required: true }) data!: OrderingActivityData;
  @Input() disabled = false;
  @Output() answerSubmitted = new EventEmitter<string[]>();

  protected items: OrderingItem[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && this.data) {
      this.initItems();
    }
  }

  private initItems(): void {
    if (!this.data?.items) {
      this.items = [];
      return;
    }

    const rawList = [...this.data.items];
    this.items = this.shuffle(rawList);
  }

  private shuffle(array: OrderingItem[]): OrderingItem[] {
    const arr = [...array];
    if (arr.length <= 1) return arr;

    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    // Ensure it's not accidentally in the initial order if length > 1
    const allSame = arr.every((item, idx) => item.id === array[idx].id);
    if (allSame && arr.length > 1) {
      arr.push(arr.shift()!);
    }

    return arr;
  }

  protected drop(event: CdkDragDrop<OrderingItem[]>): void {
    if (this.disabled) return;

    moveItemInArray(this.items, event.previousIndex, event.currentIndex);
  }

  get isComplete(): boolean {
    return this.items.length > 0;
  }

  submit(): void {
    if (this.disabled || !this.isComplete) {
      return;
    }

    const currentOrderIds = this.items.map((item) => item.id);
    this.answerSubmitted.emit(currentOrderIds);
  }
}
