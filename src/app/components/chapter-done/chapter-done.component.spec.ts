import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ChapterDoneComponent } from './chapter-done.component';
import { UiTextService } from '../../shared/services/ui-text.service';
import { LanguageService } from '../../shared/services/language.service';

describe('ChapterDoneComponent', () => {
  let component: ChapterDoneComponent;
  let router: Router;

  beforeEach(async () => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [ChapterDoneComponent],
      providers: [UiTextService, LanguageService, { provide: Router, useValue: routerSpy }],
    }).compileComponents();

    const fixture = TestBed.createComponent(ChapterDoneComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to the map on goHome()', () => {
    component['goHome']();
    expect(router.navigate).toHaveBeenCalledWith(['/map']);
  });

  it('should navigate to game on playAgain()', () => {
    component['playAgain']();
    expect(router.navigate).toHaveBeenCalledWith(['/game']);
  });
});
