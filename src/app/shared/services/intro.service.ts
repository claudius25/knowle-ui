import { Injectable } from '@angular/core';

const STORAGE_KEY = 'knowle-intro-seen';

@Injectable({ providedIn: 'root' })
export class IntroService {
  hasSeenIntro(): boolean {
    return localStorage.getItem(STORAGE_KEY) === 'true';
  }

  markIntroSeen(): void {
    localStorage.setItem(STORAGE_KEY, 'true');
  }
}
