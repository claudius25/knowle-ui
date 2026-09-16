import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrueFalseComponent } from './true-false.component';
import { UiTextService } from '../../../shared/services/ui-text.service';
import { AudioPlayerService } from '../../../shared/services/audio-player.service';
import { TrueFalseActivityData } from '../../../shared/models/game.types';

const MOCK_DATA: TrueFalseActivityData = {
  question: 'România se află pe continentul Europa?',
  description: 'Uscatul de pe Pământ este împărțit în continente mari.',
  descriptionKey: 'easy_geo_4_desc',
  questionKey: 'easy_geo_4_question',
  options: [true, false],
};

describe('TrueFalseComponent', () => {
  let component: TrueFalseComponent;
  let fixture: ComponentFixture<TrueFalseComponent>;
  let audioPlayerSpy: jasmine.SpyObj<AudioPlayerService>;

  beforeEach(async () => {
    audioPlayerSpy = jasmine.createSpyObj('AudioPlayerService', ['playKeys', 'stop'], {
      isPlaying: false,
    });
    audioPlayerSpy.playKeys.and.returnValue(Promise.resolve());

    await TestBed.configureTestingModule({
      imports: [TrueFalseComponent],
      providers: [UiTextService, { provide: AudioPlayerService, useValue: audioPlayerSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(TrueFalseComponent);
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
    component['select'](true);
    expect(component.answerSelected.emit).toHaveBeenCalledWith(true);
  });

  it('should play description and question audio keys on speak()', () => {
    component['speak']();
    expect(audioPlayerSpy.playKeys).toHaveBeenCalledWith([
      'easy_geo_4_desc',
      'easy_geo_4_question',
    ]);
  });

  it('should stop audio if already playing', () => {
    Object.defineProperty(audioPlayerSpy, 'isPlaying', { value: true, configurable: true });
    component['speak']();
    expect(audioPlayerSpy.stop).toHaveBeenCalled();
  });
});
