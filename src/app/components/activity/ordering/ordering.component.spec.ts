import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { OrderingComponent } from './ordering.component';
import { UiTextService } from '../../../shared/services/ui-text.service';
import { OrderingActivityData } from '../../../shared/models/game.types';
import { OrderingActivityModel } from '../../../shared/models/activities';

const MOCK_DATA: OrderingActivityData = {
  question: 'Ordonează formele de relief de la cea mai joasă la cea mai înaltă:',
  items: [
    { id: 'item_1', text: 'Câmpie (joasă)' },
    { id: 'item_2', text: 'Deal (medie)' },
    { id: 'item_3', text: 'Munte (înalt)' },
  ],
};

function createModel(): OrderingActivityModel {
  return new OrderingActivityModel({
    activityId: 'easy_geo_7',
    title: 'Relief',
    type: 'ORDERING',
    difficulty: 'EASY',
    data: MOCK_DATA,
  });
}

describe('OrderingComponent', () => {
  let component: OrderingComponent;
  let fixture: ComponentFixture<OrderingComponent>;
  let model: OrderingActivityModel;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderingComponent],
      providers: [UiTextService, provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    model = createModel();
    fixture = TestBed.createComponent(OrderingComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('activity', model);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with all items and be ready to submit', () => {
    expect(model.items.length).toBe(3);
    expect(model.isReadyToSubmit).toBeTrue();
  });

  it('should reorder items on drop event', () => {
    const originalOrder = model.items.map((i) => i.id);

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
    expect(model.items[1].id).toBe(originalOrder[0]);
    expect(model.items[0].id).toBe(originalOrder[1]);
  });

  it('should build the answer from the current order', () => {
    const expectedIds = model.items.map((i) => i.id);
    expect(model.prepareSubmission()).toEqual(expectedIds);
  });
});
