import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Activity, AnswerResponse, Difficulty, GameStartResponse } from '../models/game.types';
import { LanguageService } from './language.service';

const GAME_API_URL = 'http://localhost:3000';

@Injectable({ providedIn: 'root' })
export class GameService {
  private readonly http = inject(HttpClient);
  private readonly languageService = inject(LanguageService);

  startGame(): Observable<GameStartResponse> {
    const params = new HttpParams()
      .set('language', this.languageService.getCurrentLanguage())
      .set('age', '9')
      .set('difficulty', '1');

    return this.http.get<GameStartResponse>(`${GAME_API_URL}/game/start`, { params });
  }

  getActivity(activityId: string): Observable<Activity> {
    const params = new HttpParams().set('language', this.languageService.getCurrentLanguage());
    return this.http.get<Activity>(`${GAME_API_URL}/game/activity/${activityId}`, { params });
  }

  submitAnswer(activityId: string, answer: unknown, difficulty: Difficulty): Observable<AnswerResponse> {
    return this.http.post<AnswerResponse>(`${GAME_API_URL}/game/answer`, {
      activityId,
      answer,
      language: this.languageService.getCurrentLanguage(),
      age: 9,
      difficulty: this.difficultyValue(difficulty),
    });
  }

  private difficultyValue(difficulty: Difficulty): number {
    return { EASY: 1, MEDIUM: 2, HARD: 3 }[difficulty];
  }
}
