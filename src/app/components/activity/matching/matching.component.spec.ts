import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatchingComponent } from './matching.component';
import { UiTextService } from '../../../shared/services/ui-text.service';
import { MatchingActivityData } from '../../../shared/models/game.types';

const MOCK_DATA: MatchingActivityData = {
  question: 'Potrivește fiecare instrument cu descrierea sa:',
  pairs: [
    { id: 'pair_1', left: 'Busola', right: 'Arată Nordul' },
    { id: 'pair_2', left: 'Globul', right: 'Model 3D' },
    { id: 'pair_3', left: 'Harta', right: 'Desen 2D' },
  ],
};

describe('MatchingComponent', () => {
  let component: MatchingComponent;
  let fixture: ComponentFixture<MatchingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatchingComponent],
      providers: [UiTextService],
    }).compileComponents();

    fixture = TestBed.createComponent(MatchingComponent);
    component = fixture.componentInstance;
    component.data = MOCK_DATA;
    fixture.componentRef.setInput('data', MOCK_DATA);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize left and right items', () => {
    expect(component['leftItems'].length).toBe(3);
    expect(component['rightItems'].length).toBe(3);
    expect(component.isComplete).toBeFalse();
  });

  it('should pair items when selecting matching left then right, and disable them', () => {
    component['selectLeft']('pair_1');
    expect(component['selectedLeftId']).toBe('pair_1');
    expect(component['isLeftSelected']('pair_1')).toBeTrue();

    component['selectRight']('pair_1');
    expect(component['selectedLeftId']).toBeNull();
    expect(component['selectedRightId']).toBeNull();
    expect(component['isMatched']('pair_1')).toBeTrue();
  });

  it('should deselect both items when selecting mismatched pair', (done) => {
    component['selectLeft']('pair_1');
    component['selectRight']('pair_2');

    expect(component['wrongPair']).toEqual({ leftId: 'pair_1', rightId: 'pair_2' });
    expect(component['isMatched']('pair_1')).toBeFalse();
    expect(component['isMatched']('pair_2')).toBeFalse();

    setTimeout(() => {
      expect(component['selectedLeftId']).toBeNull();
      expect(component['selectedRightId']).toBeNull();
      expect(component['wrongPair']).toBeNull();
      done();
    }, 750);
  });

  it('should complete when all pairs are matched and emit answerSubmitted', () => {
    spyOn(component.answerSubmitted, 'emit');

    component['selectLeft']('pair_1');
    component['selectRight']('pair_1');

    component['selectLeft']('pair_2');
    component['selectRight']('pair_2');

    component['selectLeft']('pair_3');
    component['selectRight']('pair_3');

    expect(component.isComplete).toBeTrue();
    expect(component.answerSubmitted.emit).toHaveBeenCalledWith({
      pair_1: 'pair_1',
      pair_2: 'pair_2',
      pair_3: 'pair_3',
    });
  });
});
