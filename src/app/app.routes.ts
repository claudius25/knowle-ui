import { Routes } from '@angular/router';
import { GameComponent } from './components/game/game.component';
import { IntroComponent } from './components/intro/intro.component';
import { HomeComponent } from './home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'intro', component: IntroComponent },
  { path: 'game', component: GameComponent },
  { path: '**', redirectTo: '' },
];
