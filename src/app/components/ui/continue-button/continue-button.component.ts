import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GButtonComponent } from '../../../shared/components/g-button/g-button.component';

@Component({
  selector: 'app-continue-button',
  standalone: true,
  imports: [GButtonComponent],
  templateUrl: './continue-button.component.html',
  styleUrl: './continue-button.component.css',
})
export class ContinueButtonComponent {
  @Input() variant: 'green' | 'grey' = 'green';
  @Output() continue = new EventEmitter<void>();
}
