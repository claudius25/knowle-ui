import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DbChapterFile } from '../../shared/services/content-database.service';
import { MapDefinition } from '../../shared/services/map.service';

const MOCK_MAP: MapDefinition = {
  version: 1,
  chapters: [
    {
      id: 'geo_basics',
      title: 'mapChapter1Title',
      subtitle: 'mapChapter1Subtitle',
      startActivityId: 'easy_geo_1',
    },
  ],
};

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
        options: [
          { id: 'a', text: 'easy_geo_1_op_1' },
          { id: 'b', text: 'easy_geo_1_op_2' },
        ],
        answer: 'b',
      },
    ],
  },
};

const MOCK_RO = {
  easy_geo_chapter_1_title: 'Descoperim Pământul',
  easy_geo_chapter_1_desc: 'Descriere capitol',
  easy_geo_1_title: 'Planeta noastră',
  easy_geo_1_desc: 'Descriere activitate',
  easy_geo_1_question: 'Întrebare',
  easy_geo_1_op_1: 'Marte',
  easy_geo_1_op_2: 'Pământ',
};

const MOCK_EN = {
  easy_geo_chapter_1_title: 'Discovering Earth',
  easy_geo_chapter_1_desc: 'Chapter description',
  easy_geo_1_title: 'Our planet',
  easy_geo_1_desc: 'Activity description',
  easy_geo_1_question: 'Question',
  easy_geo_1_op_1: 'Mars',
  easy_geo_1_op_2: 'Earth',
};

describe('AdminComponent', () => {
  let component: AdminComponent;
  let httpMock: HttpTestingController;
  let router: Router;

  beforeEach(async () => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [AdminComponent, HttpClientTestingModule],
      providers: [{ provide: Router, useValue: routerSpy }],
    }).compileComponents();

    const fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);

    fixture.detectChanges();

    // Respond to initial load
    httpMock.expectOne('/map.json').flush(MOCK_MAP);
    httpMock.expectOne('/db/easy/geography/geo_basics/db.json').flush(MOCK_DB);
    httpMock.expectOne('/db/easy/geography/geo_basics/i18n/ro.json').flush(MOCK_RO);
    httpMock.expectOne('/db/easy/geography/geo_basics/i18n/en.json').flush(MOCK_EN);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create and load database and translations', () => {
    expect(component).toBeTruthy();
    expect(component['mapChapters'].length).toBe(1);
    expect(component['currentChapter']?.activities.length).toBe(1);
    expect(component['translations'].ro['easy_geo_chapter_1_title']).toBe('Descoperim Pământul');
    expect(component['translations'].en['easy_geo_chapter_1_title']).toBe('Discovering Earth');
  });

  it('should add and remove chapters through the map', () => {
    expect(component['mapChapters'].length).toBe(1);
    component['addChapter']();
    expect(component['mapChapters'].length).toBe(2);
    expect(component['currentChapter']?.activities.length).toBe(0);

    spyOn(window, 'confirm').and.returnValue(true);
    component['removeChapter'](1);
    expect(component['mapChapters'].length).toBe(1);
    expect(component['currentChapter']?.activities.length).toBe(1);
  });

  it('should add and remove activities', () => {
    const chapter = component['currentChapter']!;
    const initialCount = chapter.activities.length;
    component['addActivity'](chapter, 'TRUE_FALSE');
    expect(chapter.activities.length).toBe(initialCount + 1);
    expect(chapter.activities[initialCount].type).toBe('TRUE_FALSE');

    spyOn(window, 'confirm').and.returnValue(true);
    component['removeActivity'](chapter, initialCount);
    expect(chapter.activities.length).toBe(initialCount);
  });

  it('should open, edit, and save translations in popup modal', () => {
    const testKey = 'test_key_1';
    component['openTranslationModal'](testKey, 'Test Modal');

    expect(component['modalData']).toBeTruthy();
    expect(component['modalData']?.key).toBe(testKey);

    component['modalData']!.ro = 'Text Română';
    component['modalData']!.en = 'English Text';
    component['saveTranslationModal']();

    expect(component['translations'].ro[testKey]).toBe('Text Română');
    expect(component['translations'].en[testKey]).toBe('English Text');
    expect(component['modalData']).toBeNull();
  });

  it('should navigate to home on goHome()', () => {
    component['goHome']();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });
});
