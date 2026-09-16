import { Component, EventEmitter, Output } from '@angular/core';
import { GButtonComponent } from '../../../shared/components/g-button/g-button.component';

@Component({
  selector: 'app-try-again-button',
  standalone: true,
  imports: [GButtonComponent],
  templateUrl: './try-again-button.component.html',
  styleUrl: './try-again-button.component.css',
})
export class TryAgainButtonComponent {
  @Output() retry = new EventEmitter<void>();
}
