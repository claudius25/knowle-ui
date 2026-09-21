import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private readonly router = inject(Router);

  protected readonly showDevNav = !environment.production;

  protected goToActivity(offset: number): void {
    const current = this.currentActivityIndex();
    const target = Math.max(1, current + offset);
    // Full reload: GameComponent reads the activity index from the route snapshot.
    window.location.assign(`/game/${target}`);
  }

  private currentActivityIndex(): number {
    const match = /\/game\/(\d+)/.exec(this.router.url);
    return match ? parseInt(match[1], 10) : 1;
  }
}
