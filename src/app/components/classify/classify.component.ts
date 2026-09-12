import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ClassifyActivityData } from '../../shared/models/game.types';
import { UiTextService } from '../../shared/services/ui-text.service';

@Component({
  selector: 'app-classify',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './classify.component.html',
  styleUrl: './classify.component.css',
})
export class ClassifyComponent {
  protected readonly uiText = inject(UiTextService);
  @Input({ required: true }) data!: ClassifyActivityData;
  @Input() disabled = false;
  @Output() answerSubmitted = new EventEmitter<Record<string, string>>();

  protected selections: Record<string, string> = {};

  protected choose(itemId: string, categoryId: string): void {
    if (!this.disabled) {
      this.selections = { ...this.selections, [itemId]: categoryId };
    }
  }

  protected isSelected(itemId: string, categoryId: string): boolean {
    return this.selections[itemId] === categoryId;
  }

  protected get isComplete(): boolean {
    return this.data.items.every((item) => Boolean(this.selections[item.id]));
  }

  protected submit(): void {
    if (!this.disabled && this.isComplete) {
      this.answerSubmitted.emit({ ...this.selections });
    }
  }
}
