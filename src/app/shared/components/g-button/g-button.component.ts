import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { UiTextService } from '../../services/ui-text.service';

@Component({
  selector: 'g-button',
  standalone: true,
  templateUrl: './g-button.component.html',
  styleUrl: './g-button.component.css',
})
export class GButtonComponent {
  protected readonly uiText = inject(UiTextService);

  @Input({ required: true }) labelKey!: string;
  @Input() disabled = false;
  @Input() selected = false;
  @Input() colors: [string, string, string] = ['#58cc02', '#46a302', '#1e90ff'];
  @Output() clicked = new EventEmitter<void>();

  protected get defaultColor(): string {
    return this.colors[0];
  }

  protected get depthColor(): string {
    return this.colors[1];
  }

  protected get selectedColor(): string {
    return this.colors[2];
  }

  private clickTimer: ReturnType<typeof setTimeout> | null = null;
  private suppressClick = false;

  protected handleMouseDown(): void {
    if (this.disabled) {
      return;
    }

    this.suppressClick = true;
    this.scheduleClick();
  }

  protected handleClick(): void {
    if (this.disabled) {
      return;
    }

    if (this.suppressClick) {
      this.suppressClick = false;
      return;
    }

    this.scheduleClick();
  }

  private scheduleClick(): void {
    if (this.clickTimer !== null) {
      clearTimeout(this.clickTimer);
    }

    this.clickTimer = setTimeout(() => {
      this.clickTimer = null;
      this.clicked.emit();
    }, 400);
  }
}
