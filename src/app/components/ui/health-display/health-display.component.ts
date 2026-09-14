import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-health-display',
  standalone: true,
  templateUrl: './health-display.component.html',
  styleUrl: './health-display.component.css',
})
export class HealthDisplayComponent {
  /** Health percentage, clamped between 0 and 100. */
  @Input() set value(value: number) {
    this._value = Math.min(100, Math.max(0, value));
  }
  get value(): number {
    return this._value;
  }

  protected get fillColor(): string {
    if (this._value <= 20) {
      return '#ff4d4d';
    }
    if (this._value <= 50) {
      return '#ffcc33';
    }
    return '#39ff14';
  }

  private _value = 100;
}
