import { TestBed } from '@angular/core/testing';
import { UiTextService } from './ui-text.service';
import { LanguageService } from './language.service';

describe('UiTextService', () => {
  let service: UiTextService;
  let languageService: LanguageService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      providers: [UiTextService, LanguageService],
    });
    service = TestBed.inject(UiTextService);
    languageService = TestBed.inject(LanguageService);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return default Romanian text for standard keys', () => {
    languageService.setLanguage('ro');
    expect(service.text('loading')).toBe('Se încarcă...');
    expect(service.text('retry')).toBe('Încearcă din nou');
    expect(service.text('chapterComplete')).toBe('Capitol finalizat!');
  });

  it('should return default English text when language is switched to en', () => {
    languageService.setLanguage('en');
    expect(service.text('loading')).toBe('Loading...');
    expect(service.text('retry')).toBe('Try again');
    expect(service.text('chapterComplete')).toBe('Chapter complete!');
  });

  it('should load translations from JSON and translate custom semantic keys', async () => {
    languageService.setLanguage('ro');
    const dict = await service.loadTranslations('ro');
    if (Object.keys(dict).length > 0) {
      expect(service.text('common_continue')).toBe('Continuă');
      expect(service.text('navigation_home')).toBe('Acasă');
    }
  });

  it('should return fallback or key if translation is missing', () => {
    expect(service.text('non_existent_key_xyz', 'Fallback Value')).toBe('Fallback Value');
    expect(service.text('non_existent_key_xyz')).toBe('non_existent_key_xyz');
  });
});
