import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MultipleChoiceComponent } from './multiple-choice.component';
import { UiTextService } from '../../../shared/services/ui-text.service';
import { AudioPlayerService } from '../../../shared/services/audio-player.service';
import { MultipleChoiceActivityData } from '../../../shared/models/game.types';

const MOCK_DATA: MultipleChoiceActivityData = {
  question: 'Pe ce planetă trăim noi?',
  description: 'Pământul este a treia planetă de la Soare.',
  descriptionKey: 'easy_geo_1_desc',
  questionKey: 'easy_geo_1_question',
  options: ['Marte', 'Pământ', 'Jupiter'],
};

describe('MultipleChoiceComponent', () => {
  let component: MultipleChoiceComponent;
  let fixture: ComponentFixture<MultipleChoiceComponent>;
  let audioPlayerSpy: jasmine.SpyObj<AudioPlayerService>;

  beforeEach(async () => {
    audioPlayerSpy = jasmine.createSpyObj('AudioPlayerService', ['playKeys', 'stop'], {
      isPlaying: false,
    });
    audioPlayerSpy.playKeys.and.returnValue(Promise.resolve());

    await TestBed.configureTestingModule({
      imports: [MultipleChoiceComponent],
      providers: [UiTextService, { provide: AudioPlayerService, useValue: audioPlayerSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(MultipleChoiceComponent);
    component = fixture.componentInstance;
    component.data = MOCK_DATA;
    fixture.componentRef.setInput('data', MOCK_DATA);
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
