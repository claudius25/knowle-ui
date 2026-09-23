import { Component, Input, inject } from '@angular/core';
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
import { ClassifyItem } from '../../../shared/models/game.types';
import { ClassifyActivityModel } from '../../../shared/models/activities';
import { GameService } from '../../../shared/services/game.service';
import { UiTextService } from '../../../shared/services/ui-text.service';
import { AudioPlayerService } from '../../../shared/services/audio-player.service';

@Component({
  selector: 'app-classify',
  standalone: true,
  imports: [AsyncPipe, CdkDropListGroup, CdkDropList, CdkDrag, MatIconModule],
  templateUrl: './classify.component.html',
  styleUrl: './classify.component.css',
})
export class ClassifyComponent {
  protected readonly uiText = inject(UiTextService);
  protected readonly game = inject(GameService);
  private readonly audioPlayer = inject(AudioPlayerService);

  @Input({ required: true }) activity!: ClassifyActivityModel;

  protected readonly isSpeaking$ = this.audioPlayer.isPlaying$;

  protected speak(): void {
    if (this.audioPlayer.isPlaying) {
      this.audioPlayer.stop();
      return;
    }

    const keys: string[] = [];
    if (this.activity.data.descriptionKey) {
      keys.push(this.activity.data.descriptionKey);
    }
    if (this.activity.data.questionKey) {
      keys.push(this.activity.data.questionKey);
    }

    if (keys.length > 0) {
      void this.audioPlayer.playKeys(keys);
    }
  }

  protected drop(event: CdkDragDrop<ClassifyItem[]>): void {
    if (this.activity.isLocked) {
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
}
