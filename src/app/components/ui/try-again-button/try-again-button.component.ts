import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-try-again-button',
  standalone: true,
  templateUrl: './try-again-button.component.html',
  styleUrl: './try-again-button.component.css',
})
export class TryAgainButtonComponent {
  @Output() retry = new EventEmitter<void>();
}
