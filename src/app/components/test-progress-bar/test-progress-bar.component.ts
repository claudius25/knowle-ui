import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HealthDisplayComponent } from '../ui/health-display/health-display.component';
import { CoinDisplayComponent } from '../ui/coin-display/coin-display.component';

@Component({
  selector: 'app-test-progress-bar',
  standalone: true,
  imports: [CommonModule, HealthDisplayComponent, CoinDisplayComponent],
  templateUrl: './test-progress-bar.component.html',
  styleUrl: './test-progress-bar.component.css',
})
export class TestProgressBarComponent {
  /** Progress percentage, clamped between 0 and 100. */
  @Input() set progress(value: number) {
    this._progress = Math.min(100, Math.max(0, value));
  }
  get progress(): number {
    return this._progress;
  }

  @Input() coins = 0;
  @Input() health = 0;

  @Output() close = new EventEmitter<void>();

  private _progress = 0;

  protected onClose(): void {
    this.close.emit();
  }
}
