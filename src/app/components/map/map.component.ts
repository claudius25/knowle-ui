import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CoinDisplayComponent } from '../ui/coin-display/coin-display.component';
import { MapChapter } from '../../shared/services/map.service';
import { GameService } from '../../shared/services/game.service';
import { UiTextService } from '../../shared/services/ui-text.service';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [MatIconModule, CoinDisplayComponent],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css',
})
export class MapComponent implements OnInit {
  private readonly router = inject(Router);
  protected readonly game = inject(GameService);
  protected readonly uiText = inject(UiTextService);

  protected chapters: readonly MapChapter[] = [];
  protected loading = true;

  ngOnInit(): void {
    this.game.loadChapters().subscribe({
      next: (chapters) => {
        this.chapters = chapters;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  protected openChapter(chapter: MapChapter): void {
    if (chapter.locked) {
      return;
    }

    this.router.navigate(['/game'], { queryParams: { chapter: chapter.id } });
  }

  protected goBack(): void {
    this.router.navigate(['/']);
  }

  protected hideBrokenImage(event: Event): void {
    (event.target as HTMLImageElement).style.display = 'none';
  }
}
