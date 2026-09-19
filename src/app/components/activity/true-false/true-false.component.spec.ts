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

  it('should map the boolean options to the localized labels', () => {
    const uiText = TestBed.inject(UiTextService);
    expect(component['choiceData'].options).toEqual([
      uiText.text('trueLabel'),
      uiText.text('falseLabel'),
    ]);
  });

  it('should emit answerSelected as a boolean', () => {
    spyOn(component.answerSelected, 'emit');
    const [trueLabel, falseLabel] = component['choiceData'].options;

    component['handleSelection'](trueLabel);
    expect(component.answerSelected.emit).toHaveBeenCalledWith(true);

    component['handleSelection'](falseLabel);
    expect(component.answerSelected.emit).toHaveBeenCalledWith(false);
  });

  it('should map the selected boolean back to the matching option', () => {
    const [trueLabel, falseLabel] = component['choiceData'].options;

    expect(component['selectedOption']).toBeNull();

    component.selectedAnswer = true;
    expect(component['selectedOption']).toBe(trueLabel);

    component.selectedAnswer = false;
    expect(component['selectedOption']).toBe(falseLabel);
  });
});
