import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-chapter-button',
  standalone: true,
  templateUrl: './chapter-button.component.html',
  styleUrl: './chapter-button.component.css',
})
export class ChapterButtonComponent {
  @Output() chapter = new EventEmitter<void>();
}
