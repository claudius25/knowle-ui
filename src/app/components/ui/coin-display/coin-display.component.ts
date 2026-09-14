import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-coin-display',
  standalone: true,
  templateUrl: './coin-display.component.html',
  styleUrl: './coin-display.component.css',
})
export class CoinDisplayComponent {
  @Input() amount = 0;
}
