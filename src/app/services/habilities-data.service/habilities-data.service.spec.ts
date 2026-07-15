import { TestBed } from '@angular/core/testing';

import { HabilitiesDataService } from './habilities-data.service';

describe('HabilitiesDataService', () => {
  let service: HabilitiesDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HabilitiesDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
