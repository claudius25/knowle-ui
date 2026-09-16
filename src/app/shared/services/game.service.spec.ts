import { TestBed } from '@angular/core/testing';
import { GameService } from './game.service';
import { ContentDatabaseService } from './content-database.service';
import { of } from 'rxjs';
import { Activity, AnswerResponse, GameStartResponse } from '../models/game.types';

describe('GameService', () => {
  let service: GameService;
  let contentDbSpy: jasmine.SpyObj<ContentDatabaseService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('ContentDatabaseService', ['startGame', 'getActivity', 'submitAnswer']);

    TestBed.configureTestingModule({
      providers: [
        GameService,
        { provide: ContentDatabaseService, useValue: spy },
      ],
    });

    service = TestBed.inject(GameService);
    contentDbSpy = TestBed.inject(ContentDatabaseService) as jasmine.SpyObj<ContentDatabaseService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should delegate startGame to ContentDatabaseService', (done) => {
    const mockStart: GameStartResponse = {
      activityId: 'easy_geo_1',
      title: 'Planeta noastră',
      type: 'MULTIPLE_CHOICE',
      difficulty: 'EASY',
    };

    contentDbSpy.startGame.and.returnValue(of(mockStart));

    service.startGame().subscribe((res) => {
      expect(res).toEqual(mockStart);
      expect(contentDbSpy.startGame).toHaveBeenCalledWith('EASY', 'geography');
      done();
    });
  });

  it('should delegate getActivity to ContentDatabaseService', (done) => {
    const mockActivity: Activity = {
      activityId: 'easy_geo_1',
      title: 'Planeta noastră',
      type: 'MULTIPLE_CHOICE',
      difficulty: 'EASY',
      data: {
        question: 'Pe ce planetă trăim?',
        options: ['Marte', 'Pământ'],
      },
    };

    contentDbSpy.getActivity.and.returnValue(of(mockActivity));

    service.getActivity('easy_geo_1').subscribe((res) => {
      expect(res).toEqual(mockActivity);
      expect(contentDbSpy.getActivity).toHaveBeenCalledWith('easy_geo_1', 'EASY', 'geography');
      done();
    });
  });

  it('should delegate submitAnswer to ContentDatabaseService', (done) => {
    const mockResponse: AnswerResponse = {
      correct: true,
      nextActivity: {
        activityId: 'easy_geo_2',
        title: 'Apa pe Pământ',
        type: 'TRUE_FALSE',
        difficulty: 'EASY',
      },
    };

    contentDbSpy.submitAnswer.and.returnValue(of(mockResponse));

    service.submitAnswer('easy_geo_1', 'Pământ', 'EASY').subscribe((res) => {
      expect(res).toEqual(mockResponse);
      expect(contentDbSpy.submitAnswer).toHaveBeenCalledWith('easy_geo_1', 'Pământ', 'EASY', 'geography');
      done();
    });
  });
});
