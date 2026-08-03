import { TestBed } from '@angular/core/testing';

import { RenderizaFeedbackService } from './renderiza-feedback.service';

describe('RenderizaFeedbackService', () => {
  let service: RenderizaFeedbackService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RenderizaFeedbackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
