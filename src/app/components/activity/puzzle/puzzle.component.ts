import { Component, Input, OnChanges, SimpleChanges, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { CdkDrag, CdkDragDrop, CdkDropList, CdkDropListGroup } from '@angular/cdk/drag-drop';
import { MatIconModule } from '@angular/material/icon';
import { PuzzleActivityModel } from '../../../shared/models/activities';
import { GameService } from '../../../shared/services/game.service';
import { UiTextService } from '../../../shared/services/ui-text.service';
import { AudioPlayerService } from '../../../shared/services/audio-player.service';

@Component({
  selector: 'app-puzzle',
  standalone: true,
  imports: [AsyncPipe, CdkDropListGroup, CdkDropList, CdkDrag, MatIconModule],
  templateUrl: './puzzle.component.html',
  styleUrl: './puzzle.component.css',
})
export class PuzzleComponent implements OnChanges {
  protected readonly uiText = inject(UiTextService);
  protected readonly game = inject(GameService);
  private readonly audioPlayer = inject(AudioPlayerService);

  protected readonly gridSize = 3;
  private static readonly MAX_BOARD_VH = 36;

  @Input({ required: true }) activity!: PuzzleActivityModel;

  protected readonly isSpeaking$ = this.audioPlayer.isPlaying$;

  /** `pieces[position]` holds the index of the piece currently shown at that position. */
  protected pieces: number[] = [];
  /** Keeps the board proportional to the image so the pieces are not distorted. */
  protected boardAspectRatio = '1';
  /** Width is capped so the board's derived height stays within the visible area. */
  protected boardWidth = PuzzleComponent.boardWidthFor(1);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['activity'] && this.activity) {
      this.shufflePieces();
      this.measureImage();
    }
  }

  private measureImage(): void {
    this.boardAspectRatio = '1';
    this.boardWidth = PuzzleComponent.boardWidthFor(1);
    if (!this.activity.data.image) {
      return;
    }

    const probe = new Image();
    probe.addEventListener(
      'load',
      () => {
        if (probe.naturalWidth > 0 && probe.naturalHeight > 0) {
          this.boardAspectRatio = `${probe.naturalWidth} / ${probe.naturalHeight}`;
          this.boardWidth = PuzzleComponent.boardWidthFor(probe.naturalWidth / probe.naturalHeight);
        }
      },
      { once: true },
    );
    probe.src = this.activity.data.image;
  }

  private static boardWidthFor(ratio: number): string {
    return `min(100%, 420px, ${(PuzzleComponent.MAX_BOARD_VH * ratio).toFixed(1)}vh)`;
  }

  private shufflePieces(): void {
    const total = this.gridSize * this.gridSize;
    const ordered = Array.from({ length: total }, (_, index) => index);

    do {
      this.pieces = this.shuffle([...ordered]);
    } while (this.isOrdered(this.pieces));

    this.activity.solved = false;
  }

  protected drop(event: CdkDragDrop<number>): void {
    const from = event.previousContainer.data;
    const to = event.container.data;

    if (this.activity.isLocked || this.activity.solved || from === to) {
      return;
    }

    [this.pieces[from], this.pieces[to]] = [this.pieces[to], this.pieces[from]];

    if (this.isOrdered(this.pieces)) {
      this.activity.solved = true;
    }
  }

  protected select(option: string): void {
    this.activity.selectLabel(option);
  }

  protected pieceBackgroundPosition(piece: number): string {
    const steps = this.gridSize - 1;
    const column = piece % this.gridSize;
    const row = Math.floor(piece / this.gridSize);
    return `${(column * 100) / steps}% ${(row * 100) / steps}%`;
  }

  protected speak(): void {
    if (this.audioPlayer.isPlaying) {
      this.audioPlayer.stop();
      return;
    }

    const keys: string[] = [];
    if (this.activity.data.descriptionKey) {
      keys.push(this.activity.data.descriptionKey);
    }
    if (this.activity.solved && this.activity.data.questionKey) {
      keys.push(this.activity.data.questionKey);
    }

    if (keys.length > 0) {
      void this.audioPlayer.playKeys(keys);
    }
  }

  private isOrdered(pieces: number[]): boolean {
    return pieces.every((piece, position) => piece === position);
  }

  private shuffle(items: number[]): number[] {
    for (let i = items.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [items[i], items[j]] = [items[j], items[i]];
    }
    return items;
  }
}
