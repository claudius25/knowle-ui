import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  inject,
} from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
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
import { AudioPlayerService } from '../../../shared/services/audio-player.service';

@Component({
  selector: 'app-classify',
  standalone: true,
  imports: [AsyncPipe, CdkDropListGroup, CdkDropList, CdkDrag, MatIconModule],
  templateUrl: './classify.component.html',
  styleUrl: './classify.component.css',
})
export class ClassifyComponent implements OnChanges {
  protected readonly uiText = inject(UiTextService);
  private readonly audioPlayer = inject(AudioPlayerService);

  @Input({ required: true }) data!: ClassifyActivityData;
  @Input() disabled = false;
  @Output() answerSubmitted = new EventEmitter<Record<string, string>>();

  protected readonly isSpeaking$ = this.audioPlayer.isPlaying$;

  protected pool: ClassifyItem[] = [];
  protected categoryItems: Record<string, ClassifyItem[]> = {};

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
    console.log('Pool length:', this.pool.length);
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
