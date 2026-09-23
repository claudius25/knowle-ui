import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { MatchingComponent } from './matching.component';
import { UiTextService } from '../../../shared/services/ui-text.service';
import { MatchingActivityData } from '../../../shared/models/game.types';
import { MatchingActivityModel } from '../../../shared/models/activities';

const MOCK_DATA: MatchingActivityData = {
  question: 'Potrivește fiecare instrument cu descrierea sa:',
  pairs: [
    { id: 'pair_1', left: 'Busola', right: 'Arată Nordul' },
    { id: 'pair_2', left: 'Globul', right: 'Model 3D' },
    { id: 'pair_3', left: 'Harta', right: 'Desen 2D' },
  ],
};

function createModel(): MatchingActivityModel {
  return new MatchingActivityModel({
    activityId: 'easy_geo_6',
    title: 'Instrumente',
    type: 'MATCHING',
    difficulty: 'EASY',
    data: MOCK_DATA,
  });
}

describe('MatchingComponent', () => {
  let component: MatchingComponent;
  let fixture: ComponentFixture<MatchingComponent>;
  let model: MatchingActivityModel;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatchingComponent],
      providers: [UiTextService, provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    model = createModel();
    fixture = TestBed.createComponent(MatchingComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('activity', model);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize left and right items', () => {
    expect(model.leftItems.length).toBe(3);
    expect(model.rightItems.length).toBe(3);
    expect(model.isComplete).toBeFalse();
  });

  it('should pair items when selecting matching left then right, and disable them', () => {
    component['selectLeft']('pair_1');
    expect(model.selectedLeftId).toBe('pair_1');

    component['selectRight']('pair_1');
    expect(model.selectedLeftId).toBeNull();
    expect(model.selectedRightId).toBeNull();
    expect(model.isMatched('pair_1')).toBeTrue();
  });

  it('should deselect both items when selecting mismatched pair', (done) => {
    component['selectLeft']('pair_1');
    component['selectRight']('pair_2');

    expect(component['wrongPair']).toEqual({
      leftId: 'pair_1',
      rightId: 'pair_2',
      matched: false,
    });
    expect(model.isMatched('pair_1')).toBeFalse();
    expect(model.isMatched('pair_2')).toBeFalse();

    setTimeout(() => {
      expect(model.selectedLeftId).toBeNull();
      expect(model.selectedRightId).toBeNull();
      expect(component['wrongPair']).toBeNull();
      done();
    }, 750);
  });

  it('should emit completed and build the answer once all pairs are matched', () => {
    spyOn(component.completed, 'emit');

    component['selectLeft']('pair_1');
    component['selectRight']('pair_1');

    component['selectLeft']('pair_2');
    component['selectRight']('pair_2');

    component['selectLeft']('pair_3');
    component['selectRight']('pair_3');

    expect(model.isComplete).toBeTrue();
    expect(component.completed.emit).toHaveBeenCalled();
    expect(model.prepareSubmission()).toEqual({
      pair_1: 'pair_1',
      pair_2: 'pair_2',
      pair_3: 'pair_3',
    });
  });
});
