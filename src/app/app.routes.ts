import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'intro',
    loadComponent: () =>
      import('./components/intro/intro.component').then((m) => m.IntroComponent),
  },
  {
    path: 'game',
    loadComponent: () =>
      import('./components/game/game.component').then((m) => m.GameComponent),
  },
  {
    path: 'chapter-done',
    loadComponent: () =>
      import('./components/chapter-done/chapter-done.component').then((m) => m.ChapterDoneComponent),
  },
  {
    path: 'admin',
    loadComponent: () =>
      import('./components/admin/admin.component').then((m) => m.AdminComponent),
  },
  { path: '**', redirectTo: '' },
];
