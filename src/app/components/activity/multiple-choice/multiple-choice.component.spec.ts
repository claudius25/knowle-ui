import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { MultipleChoiceComponent } from './multiple-choice.component';
import { UiTextService } from '../../../shared/services/ui-text.service';
import { AudioPlayerService } from '../../../shared/services/audio-player.service';
import { MultipleChoiceActivityData } from '../../../shared/models/game.types';
import { MultipleChoiceActivityModel } from '../../../shared/models/activities';

const MOCK_DATA: MultipleChoiceActivityData = {
  question: 'Pe ce planetă trăim noi?',
  description: 'Pământul este a treia planetă de la Soare.',
  descriptionKey: 'easy_geo_1_desc',
  questionKey: 'easy_geo_1_question',
  options: ['Marte', 'Pământ', 'Jupiter'],
};

function createModel(): MultipleChoiceActivityModel {
  return new MultipleChoiceActivityModel({
    activityId: 'easy_geo_1',
    title: 'Planete',
    type: 'MULTIPLE_CHOICE',
    difficulty: 'EASY',
    data: MOCK_DATA,
  });
}

describe('MultipleChoiceComponent', () => {
  let component: MultipleChoiceComponent;
  let fixture: ComponentFixture<MultipleChoiceComponent>;
  let audioPlayerSpy: jasmine.SpyObj<AudioPlayerService>;
  let model: MultipleChoiceActivityModel;

  beforeEach(async () => {
    audioPlayerSpy = jasmine.createSpyObj('AudioPlayerService', ['playKeys', 'stop'], {
      isPlaying: false,
    });
    audioPlayerSpy.playKeys.and.returnValue(Promise.resolve());

    await TestBed.configureTestingModule({
      imports: [MultipleChoiceComponent],
      providers: [
        UiTextService,
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: AudioPlayerService, useValue: audioPlayerSpy },
      ],
    }).compileComponents();

    model = createModel();
    fixture = TestBed.createComponent(MultipleChoiceComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('activity', model);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should stage the picked option on the model', () => {
    component['select']('Pământ');
    expect(model.selectedAnswer).toBe('Pământ');
    expect(model.selectedLabel).toBe('Pământ');
  });

  it('should disable an option that was already submitted and rejected', () => {
    component['select']('Marte');
    model.markAnswered(false);
    model.retry();

    expect(model.isLabelDisabled('Marte')).toBeTrue();
    expect(model.isLabelDisabled('Pământ')).toBeFalse();
    expect(model.retryCount).toBe(1);
  });

  it('should remove the options eliminated by fifty-fifty', () => {
    model.useFiftyFifty(['Marte', 'Jupiter']);

    expect(model.fiftyFiftyUsed).toBeTrue();
    expect(model.canUseFiftyFifty).toBeFalse();
    expect(model.isLabelDisabled('Marte')).toBeTrue();
    expect(model.isLabelDisabled('Pământ')).toBeFalse();
  });

  it('should play description and question audio keys on speak()', () => {
    component['speak']();
    expect(audioPlayerSpy.playKeys).toHaveBeenCalledWith([
      'easy_geo_1_desc',
      'easy_geo_1_question',
    ]);
  });

  it('should stop audio if already playing', () => {
    Object.defineProperty(audioPlayerSpy, 'isPlaying', { value: true, configurable: true });
    component['speak']();
    expect(audioPlayerSpy.stop).toHaveBeenCalled();
  });
});
