import { TestBed } from '@angular/core/testing';
import { AudioPlayerService } from './audio-player.service';
import { LanguageService } from './language.service';

describe('AudioPlayerService', () => {
  let service: AudioPlayerService;
  let languageService: LanguageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AudioPlayerService, LanguageService],
    });
    service = TestBed.inject(AudioPlayerService);
    languageService = TestBed.inject(LanguageService);
    languageService.setLanguage('ro');
  });

  afterEach(() => {
    service.stop();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should generate correct audio URL based on key, language, difficulty, and chapter', () => {
    service.setContentScope({ difficulty: 'EASY', domain: 'geography', chapter: 'geo_basics' });

    const urlRo = service.getAudioUrl('easy_geo_1_desc');
    expect(urlRo).toBe('/db/easy/geography/geo_basics/audio/easy_geo_1_desc_ro.webm');

    const urlEn = service.getAudioUrl('easy_geo_1_question', {
      difficulty: 'easy',
      domain: 'geography',
      chapter: 'geo_terra',
      lang: 'en',
      format: 'mp3',
    });
    expect(urlEn).toBe('/db/easy/geography/geo_terra/audio/easy_geo_1_question_en.mp3');

    const globalUrl = service.getAudioUrl('happyLine1', { global: true });
    expect(globalUrl).toBe('/audio/happyLine1_ro.webm');
  });

  it('should update isPlaying state and stop audio', () => {
    expect(service.isPlaying).toBeFalse();
    service.stop();
    expect(service.isPlaying).toBeFalse();
  });
});
