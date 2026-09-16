import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MultipleChoiceComponent } from './multiple-choice.component';
import { UiTextService } from '../../../shared/services/ui-text.service';
import { TtsService } from '../../../shared/tts/tts.service';
import { LanguageService } from '../../../shared/services/language.service';
import { MultipleChoiceActivityData } from '../../../shared/models/game.types';

const MOCK_DATA: MultipleChoiceActivityData = {
  question: 'Pe ce planetă trăim noi?',
  description: 'Pământul este a treia planetă de la Soare.',
  options: ['Marte', 'Pământ', 'Jupiter'],
};

describe('MultipleChoiceComponent', () => {
  let component: MultipleChoiceComponent;
  let fixture: ComponentFixture<MultipleChoiceComponent>;
  let ttsSpy: jasmine.SpyObj<TtsService>;
  let languageService: LanguageService;

  beforeEach(async () => {
    ttsSpy = jasmine.createSpyObj('TtsService', ['speak', 'stop'], {
      isSpeaking: false,
    });
    ttsSpy.speak.and.returnValue(Promise.resolve());

    await TestBed.configureTestingModule({
      imports: [MultipleChoiceComponent],
      providers: [UiTextService, LanguageService, { provide: TtsService, useValue: ttsSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(MultipleChoiceComponent);
    component = fixture.componentInstance;
    component.data = MOCK_DATA;
    fixture.componentRef.setInput('data', MOCK_DATA);
    languageService = TestBed.inject(LanguageService);
    languageService.setLanguage('ro');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit answerSelected on select()', () => {
    spyOn(component.answerSelected, 'emit');
    component['select']('Pământ');
    expect(component.answerSelected.emit).toHaveBeenCalledWith('Pământ');
  });

  it('should speak description and question when speak() is called', () => {
    component['speak']();
    expect(ttsSpy.speak).toHaveBeenCalledWith(
      'Pământul este a treia planetă de la Soare.. Pe ce planetă trăim noi?',
      { lang: 'ro' },
    );
  });

  it('should stop speaking if already speaking', () => {
    Object.defineProperty(ttsSpy, 'isSpeaking', { value: true, configurable: true });
    component['speak']();
    expect(ttsSpy.stop).toHaveBeenCalled();
  });
});
