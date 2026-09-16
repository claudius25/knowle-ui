import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderingComponent } from './ordering.component';
import { UiTextService } from '../../../shared/services/ui-text.service';
import { OrderingActivityData } from '../../../shared/models/game.types';

const MOCK_DATA: OrderingActivityData = {
  question: 'Ordonează formele de relief de la cea mai joasă la cea mai înaltă:',
  items: [
    { id: 'item_1', text: 'Câmpie (joasă)' },
    { id: 'item_2', text: 'Deal (medie)' },
    { id: 'item_3', text: 'Munte (înalt)' },
  ],
};

describe('OrderingComponent', () => {
  let component: OrderingComponent;
  let fixture: ComponentFixture<OrderingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderingComponent],
      providers: [UiTextService],
    }).compileComponents();

    fixture = TestBed.createComponent(OrderingComponent);
    component = fixture.componentInstance;
    component.data = MOCK_DATA;
    fixture.componentRef.setInput('data', MOCK_DATA);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with all items and report isComplete true', () => {
    expect(component['items'].length).toBe(3);
    expect(component.isComplete).toBeTrue();
  });

  it('should reorder items on drop event', () => {
    const originalOrder = component['items'].map((i) => i.id);

    // Simulate drop moving first item to second position
    const mockDropEvent = {
      previousIndex: 0,
      currentIndex: 1,
      item: {} as any,
      container: {} as any,
      previousContainer: {} as any,
      isPointerOverContainer: true,
      distance: { x: 0, y: 0 },
      dropPoint: { x: 0, y: 0 },
      event: {} as any,
    };

    component['drop'](mockDropEvent);
    expect(component['items'][1].id).toBe(originalOrder[0]);
    expect(component['items'][0].id).toBe(originalOrder[1]);
  });

  it('should emit answerSubmitted on submit() with current order ids', () => {
    spyOn(component.answerSubmitted, 'emit');

    const expectedIds = component['items'].map((i) => i.id);
    component.submit();

    expect(component.answerSubmitted.emit).toHaveBeenCalledWith(expectedIds);
  });
});
