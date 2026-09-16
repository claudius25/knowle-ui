import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GButtonComponent } from '../../../shared/components/g-button/g-button.component';

@Component({
  selector: 'app-check-button',
  standalone: true,
  imports: [GButtonComponent],
  templateUrl: './check-button.component.html',
  styleUrl: './check-button.component.css',
})
export class CheckButtonComponent {
  @Input() disabled = false;
  @Output() check = new EventEmitter<void>();
}
