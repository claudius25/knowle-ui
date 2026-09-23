import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TrueFalseComponent } from './true-false.component';
import { UiTextService } from '../../../shared/services/ui-text.service';
import { AudioPlayerService } from '../../../shared/services/audio-player.service';
import { TrueFalseActivityData } from '../../../shared/models/game.types';
import { TrueFalseActivityModel } from '../../../shared/models/activities';

const MOCK_DATA: TrueFalseActivityData = {
  question: 'România se află pe continentul Europa?',
  description: 'Uscatul de pe Pământ este împărțit în continente mari.',
  descriptionKey: 'easy_geo_4_desc',
  questionKey: 'easy_geo_4_question',
  options: [true, false],
};

function createModel(): TrueFalseActivityModel {
  return new TrueFalseActivityModel({
    activityId: 'easy_geo_4',
    title: 'Continente',
    type: 'TRUE_FALSE',
    difficulty: 'EASY',
    data: MOCK_DATA,
  });
}

describe('TrueFalseComponent', () => {
  let component: TrueFalseComponent;
  let fixture: ComponentFixture<TrueFalseComponent>;
  let audioPlayerSpy: jasmine.SpyObj<AudioPlayerService>;
  let model: TrueFalseActivityModel;

  beforeEach(async () => {
    audioPlayerSpy = jasmine.createSpyObj('AudioPlayerService', ['playKeys', 'stop'], {
      isPlaying: false,
    });
    audioPlayerSpy.playKeys.and.returnValue(Promise.resolve());

    await TestBed.configureTestingModule({
      imports: [TrueFalseComponent],
      providers: [
        UiTextService,
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: AudioPlayerService, useValue: audioPlayerSpy },
      ],
    }).compileComponents();

    model = createModel();
    fixture = TestBed.createComponent(TrueFalseComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('activity', model);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should map the boolean options to the localized labels', () => {
    const uiText = TestBed.inject(UiTextService);
    expect(model.optionLabels).toEqual([uiText.text('trueLabel'), uiText.text('falseLabel')]);
  });

  it('should stage the picked label as a boolean', () => {
    const [trueLabel, falseLabel] = model.optionLabels;

    model.selectLabel(trueLabel);
    expect(model.selectedAnswer).toBeTrue();
    expect(model.selectedLabel).toBe(trueLabel);

    model.selectLabel(falseLabel);
    expect(model.selectedAnswer).toBeFalse();
    expect(model.selectedLabel).toBe(falseLabel);
  });

  it('should not offer fifty-fifty', () => {
    expect(model.supportsFiftyFifty).toBeFalse();
    expect(model.canUseFiftyFifty).toBeFalse();
  });
});
