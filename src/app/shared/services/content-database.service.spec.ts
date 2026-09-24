import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ContentDatabaseService, ContentScope, DbChapterFile } from './content-database.service';
import { LanguageService } from './language.service';

const SCOPE: ContentScope = { difficulty: 'EASY', domain: 'geography', chapter: 'geo_basics' };
const DB_URL = '/db/easy/geography/geo_basics/db.json';
const RO_URL = '/db/easy/geography/geo_basics/i18n/ro.json';

const MOCK_DB: DbChapterFile = {
  version: 1,
  chapter: {
    id: 'geo_basics',
    title: 'easy_geo_chapter_1_title',
    description: 'easy_geo_chapter_1_desc',
    activities: [
      {
        id: 'easy_geo_1',
        type: 'MULTIPLE_CHOICE',
        title: 'easy_geo_1_title',
        description: 'easy_geo_1_desc',
        question: 'easy_geo_1_question',
        pictures: ['eclipse.png'],
        options: [
          { id: 'a', text: 'easy_geo_1_op_1' },
          { id: 'b', text: 'easy_geo_1_op_2' },
        ],
        answer: 'b',
        hint: 'easy_geo_1_hint',
      },
      {
        id: 'easy_geo_2',
        type: 'TRUE_FALSE',
        title: 'easy_geo_2_title',
        description: 'easy_geo_2_desc',
        question: 'easy_geo_2_question',
        answer: true,
        hint: 'easy_geo_2_hint',
      },
      {
        id: 'easy_geo_5',
        type: 'CLASSIFY',
        title: 'easy_geo_5_title',
        description: 'easy_geo_5_desc',
        question: 'easy_geo_5_question',
        categories: [
          { id: 'land', label: 'easy_geo_5_cat_1' },
          { id: 'water', label: 'easy_geo_5_cat_2' },
        ],
        items: [
          { id: 'item_1', label: 'easy_geo_5_item_1' },
          { id: 'item_2', label: 'easy_geo_5_item_2' },
        ],
        answer: {
          item_1: 'land',
          item_2: 'water',
        },
      },
      {
        id: 'easy_geo_8',
        type: 'MATCHING',
        title: 'easy_geo_8_title',
        description: 'easy_geo_8_desc',
        question: 'easy_geo_8_question',
        pairs: [
          { id: 'pair_1', left: 'easy_geo_8_left_1', right: 'easy_geo_8_right_1' },
          { id: 'pair_2', left: 'easy_geo_8_left_2', right: 'easy_geo_8_right_2' },
        ],
        answer: [
          { left: 'easy_geo_8_left_1', right: 'easy_geo_8_right_1' },
          { left: 'easy_geo_8_left_2', right: 'easy_geo_8_right_2' },
        ],
      },
      {
        id: 'easy_geo_9',
        type: 'ORDERING',
        title: 'easy_geo_9_title',
        description: 'easy_geo_9_desc',
        question: 'easy_geo_9_question',
        items: [
          { id: 'item_1', text: 'easy_geo_9_item_1' },
          { id: 'item_2', text: 'easy_geo_9_item_2' },
        ],
        answer: ['item_1', 'item_2'],
      },
    ],
  },
};

const MOCK_RO_DICT: Record<string, string> = {
  easy_geo_chapter_1_title: 'Descoperim Pământul',
  easy_geo_1_title: 'Planeta noastră',
  easy_geo_1_question: 'Pe ce planetă trăim?',
  easy_geo_1_op_1: 'Marte',
  easy_geo_1_op_2: 'Pământ',
  easy_geo_2_title: 'Apa pe Pământ',
  easy_geo_2_desc: 'Descriere apa pe Pământ',
  easy_geo_2_question: 'Este apa predominantă?',
  easy_geo_5_title: 'Forme de relief',
  easy_geo_5_question: 'Clasifică elementele:',
  easy_geo_5_cat_1: 'Uscat',
  easy_geo_5_cat_2: 'Apă',
  easy_geo_5_item_1: 'Munte',
  easy_geo_5_item_2: 'Ocean',
  easy_geo_8_title: 'Instrumente',
  easy_geo_8_question: 'Potrivește instrumentele:',
  easy_geo_8_left_1: 'Busola',
  easy_geo_8_right_1: 'Nordul',
  easy_geo_8_left_2: 'Globul',
  easy_geo_8_right_2: 'Model 3D',
  easy_geo_9_title: 'Înălțimi',
  easy_geo_9_question: 'Ordonează formele de relief:',
  easy_geo_9_item_1: 'Câmpie',
  easy_geo_9_item_2: 'Munte',
  quiz_incorrect: 'Răspuns greșit!',
};

describe('ContentDatabaseService', () => {
  let service: ContentDatabaseService;
  let httpMock: HttpTestingController;
  let languageService: LanguageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ContentDatabaseService, LanguageService],
    });
    service = TestBed.inject(ContentDatabaseService);
    httpMock = TestBed.inject(HttpTestingController);
    languageService = TestBed.inject(LanguageService);
    languageService.setLanguage('ro');
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load database and translations to startGame', (done) => {
    service.startGame(SCOPE).subscribe((res) => {
      expect(res.activityId).toBe('easy_geo_1');
      expect(res.title).toBe('Planeta noastră');
      expect(res.type).toBe('MULTIPLE_CHOICE');
      expect(res.difficulty).toBe('EASY');
      done();
    });

    const dbReq = httpMock.expectOne(DB_URL);
    expect(dbReq.request.method).toBe('GET');
    dbReq.flush(MOCK_DB);

    const i18nReq = httpMock.expectOne(RO_URL);
    expect(i18nReq.request.method).toBe('GET');
    i18nReq.flush(MOCK_RO_DICT);
  });

  it('should start game with specific 1-based index (e.g. 3rd activity)', (done) => {
    service.startGame(SCOPE, 3).subscribe((res) => {
      expect(res.activityId).toBe('easy_geo_5');
      expect(res.title).toBe('Forme de relief');
      expect(res.type).toBe('CLASSIFY');
      done();
    });

    httpMock.expectOne(DB_URL).flush(MOCK_DB);
    httpMock.expectOne(RO_URL).flush(MOCK_RO_DICT);
  });

  it('should start game with specific activity ID string', (done) => {
    service.startGame(SCOPE, 'easy_geo_5').subscribe((res) => {
      expect(res.activityId).toBe('easy_geo_5');
      expect(res.title).toBe('Forme de relief');
      expect(res.type).toBe('CLASSIFY');
      done();
    });

    httpMock.expectOne(DB_URL).flush(MOCK_DB);
    httpMock.expectOne(RO_URL).flush(MOCK_RO_DICT);
  });

  it('should load multiple choice activity with translated options and pictures', (done) => {
    service.getActivity('easy_geo_1', SCOPE).subscribe((act) => {
      expect(act.activityId).toBe('easy_geo_1');
      expect(act.type).toBe('MULTIPLE_CHOICE');
      expect(act.title).toBe('Planeta noastră');
      if (act.type === 'MULTIPLE_CHOICE') {
        expect(act.data.question).toBe('Pe ce planetă trăim?');
        expect(act.data.options).toEqual(['Marte', 'Pământ']);
        expect(act.data.pictures).toEqual(['/db/easy/geography/geo_basics/pics/eclipse.png']);
      }
      done();
    });

    httpMock.expectOne(DB_URL).flush(MOCK_DB);
    httpMock.expectOne(RO_URL).flush(MOCK_RO_DICT);
  });

  it('should validate correct multiple choice answer and return next activity', (done) => {
    service.submitAnswer('easy_geo_1', 'Pământ', SCOPE).subscribe((res) => {
      expect(res.correct).toBeTrue();
      expect(res.nextActivity).toBeTruthy();
      expect(res.nextActivity?.activityId).toBe('easy_geo_2');
      done();
    });

    httpMock.expectOne(DB_URL).flush(MOCK_DB);
    httpMock.expectOne(RO_URL).flush(MOCK_RO_DICT);
  });

  it('should validate incorrect multiple choice answer and allow continuing', (done) => {
    service.submitAnswer('easy_geo_1', 'Marte', SCOPE).subscribe((res) => {
      expect(res.correct).toBeFalse();
      expect(res.nextActivity?.activityId).toBe('easy_geo_2');
      expect(res.retry).toBeTrue();
      done();
    });

    httpMock.expectOne(DB_URL).flush(MOCK_DB);
    httpMock.expectOne(RO_URL).flush(MOCK_RO_DICT);
  });

  it('should validate true/false activity correctly', (done) => {
    service.getActivity('easy_geo_2', SCOPE).subscribe((act) => {
      expect(act.activityId).toBe('easy_geo_2');
      expect(act.type).toBe('TRUE_FALSE');
      if (act.type === 'TRUE_FALSE') {
        expect(act.data.description).toBe('Descriere apa pe Pământ');
        expect(act.data.question).toBe('Este apa predominantă?');
      }

      service.submitAnswer('easy_geo_2', true, SCOPE).subscribe((res) => {
        expect(res.correct).toBeTrue();
        expect(res.nextActivity?.activityId).toBe('easy_geo_5');
        done();
      });
    });

    httpMock.expectOne(DB_URL).flush(MOCK_DB);
    httpMock.expectOne(RO_URL).flush(MOCK_RO_DICT);
  });

  it('should validate classify activity correctly', (done) => {
    service
      .submitAnswer('easy_geo_5', { item_1: 'land', item_2: 'water' }, SCOPE)
      .subscribe((res) => {
        expect(res.correct).toBeTrue();
        expect(res.nextActivity?.activityId).toBe('easy_geo_8');
        done();
      });

    httpMock.expectOne(DB_URL).flush(MOCK_DB);
    httpMock.expectOne(RO_URL).flush(MOCK_RO_DICT);
  });

  it('should validate matching activity correctly', (done) => {
    service
      .submitAnswer('easy_geo_8', { pair_1: 'pair_1', pair_2: 'pair_2' }, SCOPE)
      .subscribe((res) => {
        expect(res.correct).toBeTrue();
        expect(res.nextActivity?.activityId).toBe('easy_geo_9');
        done();
      });

    httpMock.expectOne(DB_URL).flush(MOCK_DB);
    httpMock.expectOne(RO_URL).flush(MOCK_RO_DICT);
  });

  it('should validate ordering activity correctly', (done) => {
    service.submitAnswer('easy_geo_9', ['item_1', 'item_2'], SCOPE).subscribe((res) => {
      expect(res.correct).toBeTrue();
      expect(res.nextActivity).toBeNull();
      done();
    });

    httpMock.expectOne(DB_URL).flush(MOCK_DB);
    httpMock.expectOne(RO_URL).flush(MOCK_RO_DICT);
  });
});
