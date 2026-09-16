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
import { MatchingActivityData, MatchingPair } from '../../../shared/models/game.types';
import { UiTextService } from '../../../shared/services/ui-text.service';

interface MatchingColumnItem {
  id: string;
  text: string;
}

@Component({
  selector: 'app-matching',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './matching.component.html',
  styleUrl: './matching.component.css',
})
export class MatchingComponent implements OnChanges {
  protected readonly uiText = inject(UiTextService);

  @Input({ required: true }) data!: MatchingActivityData;
  @Input() disabled = false;
  @Output() answerSubmitted = new EventEmitter<Record<string, string>>();

  protected leftItems: MatchingColumnItem[] = [];
  protected rightItems: MatchingColumnItem[] = [];

  protected selectedLeftId: string | null = null;
  protected selectedRightId: string | null = null;

  /**
   * Set of matched item IDs (since left and right have the same pair.id,
   * a matched pair's id is stored here).
   */
  protected matchedPairIds = new Set<string>();

  /**
   * Temporary wrong pair indication for animation before deselection.
   */
  protected wrongPair: { leftId: string; rightId: string } | null = null;
  private mismatchTimeout: number | null = null;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && this.data) {
      this.resetState();
    }
  }

  private resetState(): void {
    if (this.mismatchTimeout) {
      clearTimeout(this.mismatchTimeout);
      this.mismatchTimeout = null;
    }
    this.matchedPairIds.clear();
    this.selectedLeftId = null;
    this.selectedRightId = null;
    this.wrongPair = null;

    if (!this.data?.pairs) {
      this.leftItems = [];
      this.rightItems = [];
      return;
    }

    this.leftItems = this.data.pairs.map((p) => ({
      id: p.id,
      text: p.left,
    }));

    const rightList = this.data.pairs.map((p) => ({
      id: p.id,
      text: p.right,
    }));

    this.rightItems = this.shuffle(rightList);
  }

  private shuffle(array: MatchingColumnItem[]): MatchingColumnItem[] {
    const arr = [...array];
    if (arr.length <= 1) return arr;

    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    // If accidentally in the exact same order and length > 1, rotate by 1
    const allSame = arr.every((item, idx) => item.id === array[idx].id);
    if (allSame && arr.length > 1) {
      arr.push(arr.shift()!);
    }

    return arr;
  }

  protected selectLeft(id: string): void {
    if (this.disabled || this.matchedPairIds.has(id) || this.wrongPair) return;

    if (this.selectedLeftId === id) {
      this.selectedLeftId = null;
      return;
    }

    this.selectedLeftId = id;

    if (this.selectedRightId !== null) {
      this.checkPair(this.selectedLeftId, this.selectedRightId);
    }
  }

  protected selectRight(id: string): void {
    if (this.disabled || this.matchedPairIds.has(id) || this.wrongPair) return;

    if (this.selectedRightId === id) {
      this.selectedRightId = null;
      return;
    }

    this.selectedRightId = id;

    if (this.selectedLeftId !== null) {
      this.checkPair(this.selectedLeftId, this.selectedRightId);
    }
  }

  private checkPair(leftId: string, rightId: string): void {
    if (leftId === rightId) {
      // Correct Match!
      this.matchedPairIds.add(leftId);
      this.selectedLeftId = null;
      this.selectedRightId = null;

      if (this.isComplete) {
        this.submit();
      }
    } else {
      // Mismatch: show error style briefly, then deselect both so user can try again
      this.wrongPair = { leftId, rightId };
      this.mismatchTimeout = window.setTimeout(() => {
        this.selectedLeftId = null;
        this.selectedRightId = null;
        this.wrongPair = null;
        this.mismatchTimeout = null;
      }, 700);
    }
  }

  protected isMatched(id: string): boolean {
    return this.matchedPairIds.has(id);
  }

  protected isLeftSelected(id: string): boolean {
    return this.selectedLeftId === id;
  }

  protected isRightSelected(id: string): boolean {
    return this.selectedRightId === id;
  }

  protected isLeftWrong(id: string): boolean {
    return this.wrongPair?.leftId === id;
  }

  protected isRightWrong(id: string): boolean {
    return this.wrongPair?.rightId === id;
  }

  get isComplete(): boolean {
    const totalPairs = this.data?.pairs?.length ?? 0;
    return totalPairs > 0 && this.matchedPairIds.size === totalPairs;
  }

  submit(): void {
    if (this.disabled || !this.isComplete) {
      return;
    }

    // Build the matches record for verification: { [pairId]: pairId }
    const result: Record<string, string> = {};
    for (const id of this.matchedPairIds) {
      result[id] = id;
    }

    this.answerSubmitted.emit(result);
  }
}
