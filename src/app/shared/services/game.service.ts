import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Activity, AnswerResponse, Difficulty, GameStartResponse } from '../models/game.types';
import { ContentDatabaseService } from './content-database.service';

@Injectable({ providedIn: 'root' })
export class GameService {
  private readonly contentDb = inject(ContentDatabaseService);

  startGame(
    difficulty: Difficulty = 'EASY',
    domain = 'geography',
    startIndexOrId?: number | string,
  ): Observable<GameStartResponse> {
    return this.contentDb.startGame(difficulty, domain, startIndexOrId);
  }

  getActivity(
    activityId: string,
    difficulty: Difficulty = 'EASY',
    domain = 'geography',
  ): Observable<Activity> {
    return this.contentDb.getActivity(activityId, difficulty, domain);
  }

  submitAnswer(
    activityId: string,
    answer: unknown,
    difficulty: Difficulty = 'EASY',
    domain = 'geography',
  ): Observable<AnswerResponse> {
    return this.contentDb.submitAnswer(activityId, answer, difficulty, domain);
  }
}
