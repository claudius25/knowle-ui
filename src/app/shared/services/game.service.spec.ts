import { TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { GameService } from './game.service';
import { ContentDatabaseService, DbDatabase } from './content-database.service';
import { Activity, AnswerResponse } from '../models/game.types';
import { MultipleChoiceActivityModel } from '../models/activities';

const MOCK_DB: DbDatabase = {
  version: 1,
  chapters: [
    {
      id: 'geography_chapter_1',
      title: 'chapter_title',
      description: 'chapter_desc',
      activities: [
        { id: 'easy_geo_1', type: 'MULTIPLE_CHOICE', title: 't', description: 'd', question: 'q', answer: 'b' },
        { id: 'easy_geo_2', type: 'MULTIPLE_CHOICE', title: 't', description: 'd', question: 'q', answer: 'a' },
      ],
    },
  ],
};

function mockActivity(activityId: string): Activity {
  return {
    activityId,
    title: 'Planeta noastră',
    type: 'MULTIPLE_CHOICE',
    difficulty: 'EASY',
    isPractical: true,
    data: {
      question: 'Pe ce planetă trăim?',
      options: ['Marte', 'Pământ', 'Jupiter', 'Venus'],
      hint: 'Este numită și Planeta Albastră.',
    },
  };
}

describe('GameService', () => {
  let service: GameService;
  let contentDbSpy: jasmine.SpyObj<ContentDatabaseService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('ContentDatabaseService', [
      'loadDatabase',
      'getActivity',
      'submitAnswer',
      'getWrongOptionLabels',
    ]);
    spy.loadDatabase.and.returnValue(of(MOCK_DB));
    spy.getActivity.and.callFake((id: string) => of(mockActivity(id)));

    TestBed.configureTestingModule({
      providers: [
        GameService,
        { provide: ContentDatabaseService, useValue: spy },
        { provide: MatDialog, useValue: jasmine.createSpyObj('MatDialog', ['open']) },
      ],
    });

    service = TestBed.inject(GameService);
    contentDbSpy = TestBed.inject(ContentDatabaseService) as jasmine.SpyObj<ContentDatabaseService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should build an activity model for the first queued activity', (done) => {
    service.startSession().subscribe((model) => {
      expect(model).toBeInstanceOf(MultipleChoiceActivityModel);
      expect(model.activityId).toBe('easy_geo_1');
      expect(service.status).toBe('playing');
      expect(service.coins).toBe(0);
      expect(service.health).toBe(GameService.MAX_HEALTH);
      done();
    });
  });

  it('should award coins for a correct answer', (done) => {
    const response: AnswerResponse = { correct: true, nextActivity: null };
    contentDbSpy.submitAnswer.and.returnValue(of(response));

    service.startSession().subscribe((model) => {
      (model as MultipleChoiceActivityModel).selectLabel('Pământ');

      service.submitAnswer().subscribe((correct) => {
        expect(correct).toBeTrue();
        expect(service.coins).toBe(GameService.COINS_PER_CORRECT_ANSWER);
        expect(service.health).toBe(GameService.MAX_HEALTH);
        expect(model.coinsDelta).toBe(GameService.COINS_PER_CORRECT_ANSWER);
        done();
      });
    });
  });

  it('should take health for a wrong answer on a graded activity', (done) => {
    const response: AnswerResponse = { correct: false, nextActivity: null };
    contentDbSpy.submitAnswer.and.returnValue(of(response));

    service.startSession().subscribe((model) => {
      (model as MultipleChoiceActivityModel).selectLabel('Marte');

      service.submitAnswer().subscribe(() => {
        expect(service.health).toBe(GameService.MAX_HEALTH - GameService.HEALTH_LOSS_PER_MISTAKE);
        expect(model.healthLost).toBe(GameService.HEALTH_LOSS_PER_MISTAKE);
        done();
      });
    });
  });

  it('should charge coins for a retry and clear the staged answer', (done) => {
    contentDbSpy.submitAnswer.and.returnValue(of({ correct: false, nextActivity: null }));

    service.startSession().subscribe((model) => {
      (model as MultipleChoiceActivityModel).selectLabel('Marte');

      service.submitAnswer().subscribe(() => {
        const coinsBefore = service.coins;
        service.retry();

        expect(service.coins).toBe(coinsBefore - GameService.COINS_LOST_PER_RETRY);
        expect(model.retryCount).toBe(1);
        expect(model.selectedAnswer).toBeNull();
        expect(service.status).toBe('playing');
        done();
      });
    });
  });

  it('should charge coins and remove wrong options on fifty-fifty', (done) => {
    contentDbSpy.getWrongOptionLabels.and.returnValue(of(['Marte', 'Jupiter', 'Venus']));

    service.startSession().subscribe((model) => {
      const choice = model as MultipleChoiceActivityModel;
      service.useFiftyFifty();

      expect(choice.fiftyFiftyUsed).toBeTrue();
      expect(choice.eliminatedLabels.size).toBe(2);
      expect(choice.eliminatedLabels.has('Pământ')).toBeFalse();
      expect(service.coins).toBe(-GameService.COINS_LOST_PER_FIFTY_FIFTY);
      done();
    });
  });

  it('should record the outcome of each completed activity', (done) => {
    contentDbSpy.submitAnswer.and.returnValue(of({ correct: true, nextActivity: null }));

    service.startSession().subscribe((model) => {
      (model as MultipleChoiceActivityModel).selectLabel('Pământ');

      service.submitAnswer().subscribe(() => {
        service.advance().subscribe((next) => {
          expect(service.outcomes.length).toBe(1);
          expect(service.outcomes[0]).toEqual({
            activityId: 'easy_geo_1',
            correct: true,
            coinsDelta: GameService.COINS_PER_CORRECT_ANSWER,
            healthLost: 0,
          });
          expect(next?.activityId).toBe('easy_geo_2');
          done();
        });
      });
    });
  });
});
