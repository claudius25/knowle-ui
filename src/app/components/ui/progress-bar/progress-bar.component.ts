import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  standalone: true,
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.css',
})
export class ProgressBarComponent {
  /** Progress percentage, clamped between 0 and 100. */
  @Input() set value(value: number) {
    this._value = Math.min(100, Math.max(0, value));
  }
  get value(): number {
    return this._value;
  }

  private _value = 0;
}
