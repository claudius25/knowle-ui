import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-continue-button',
  standalone: true,
  templateUrl: './continue-button.component.html',
  styleUrl: './continue-button.component.css',
})
export class ContinueButtonComponent {
  @Input() variant: 'green' | 'grey' = 'green';
  @Output() continue = new EventEmitter<void>();
}
