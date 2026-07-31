import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualFeedbackModal } from './visual-feedback-modal';

describe('VisualFeedbackModal', () => {
  let component: VisualFeedbackModal;
  let fixture: ComponentFixture<VisualFeedbackModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisualFeedbackModal],
    }).compileComponents();

    fixture = TestBed.createComponent(VisualFeedbackModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
