import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { GameService } from './game.service';
import { ChapterService } from './chapter.service';
import { MapChapter, MapService } from './map.service';

function chapter(id: string, startActivityId: string | null): MapChapter {
  return {
    id,
    title: `${id}_title`,
    subtitle: `${id}_subtitle`,
    order: 1,
    icon: '📘',
    image: null,
    locked: !startActivityId,
    startActivityId,
  };
}

describe('GameService', () => {
  let service: GameService;
  let chapterSpy: jasmine.SpyObj<ChapterService>;

  const setUp = (chapters: MapChapter[]) => {
    const mapSpy = jasmine.createSpyObj('MapService', ['loadChapters']);
    mapSpy.loadChapters.and.returnValue(of(chapters));
    chapterSpy = jasmine.createSpyObj('ChapterService', ['startSession', 'clearSession'], {
      currentChapterId: 'geo_basics',
      coins: 120,
      health: 80,
    });

    TestBed.configureTestingModule({
      providers: [
        GameService,
        { provide: MapService, useValue: mapSpy },
        { provide: ChapterService, useValue: chapterSpy },
      ],
    });

    service = TestBed.inject(GameService);
  };

  beforeEach(() => {
    localStorage.removeItem('knowle-game-progress');
  });

  afterEach(() => {
    localStorage.removeItem('knowle-game-progress');
  });

  it('unlocks the next chapter once the previous one is completed', (done) => {
    setUp([chapter('geo_basics', 'easy_geo_1'), chapter('geo_terra', 'easy_geo_t1')]);

    service.loadChapters().subscribe((chapters) => {
      expect(chapters[0].locked).toBeFalse();
      expect(chapters[1].locked).toBeTrue();

      service.completeCurrentChapter();

      expect(service.chapters[0].completed).toBeTrue();
      expect(service.chapters[1].locked).toBeFalse();
      expect(service.totalCoins).toBe(120);
      done();
    });
  });

  it('keeps a chapter without content closed even after the previous one is completed', (done) => {
    setUp([chapter('geo_basics', 'easy_geo_1'), chapter('geo_terra', null)]);

    service.loadChapters().subscribe(() => {
      service.completeCurrentChapter();

      expect(service.chapters[1].locked).toBeTrue();
      expect(service.chapters[1].comingSoon).toBeTrue();
      done();
    });
  });
});
