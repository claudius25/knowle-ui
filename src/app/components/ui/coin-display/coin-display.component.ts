import { Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';

const ANIMATION_DURATION_MS = 1000;

@Component({
  selector: 'app-coin-display',
  standalone: true,
  templateUrl: './coin-display.component.html',
  styleUrl: './coin-display.component.css',
})
export class CoinDisplayComponent implements OnChanges, OnDestroy {
  @Input() amount = 0;

  displayedAmount = 0;

  private animationFrameId: number | null = null;

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['amount']) {
      return;
    }

    const previousValue = changes['amount'].previousValue ?? this.amount;
    if (changes['amount'].isFirstChange()) {
      this.displayedAmount = this.amount;
      return;
    }

    this.animateTo(previousValue, this.amount);
  }

  ngOnDestroy(): void {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  private animateTo(from: number, to: number): void {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
    }

    const startTime = performance.now();

    const step = (now: number) => {
      const progress = Math.min((now - startTime) / ANIMATION_DURATION_MS, 1);
      this.displayedAmount = Math.round(from + (to - from) * progress);

      if (progress < 1) {
        this.animationFrameId = requestAnimationFrame(step);
      } else {
        this.displayedAmount = to;
        this.animationFrameId = null;
      }
    };

    this.animationFrameId = requestAnimationFrame(step);
  }
}
