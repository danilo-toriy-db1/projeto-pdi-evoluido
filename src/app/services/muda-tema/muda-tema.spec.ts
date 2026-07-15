import { TestBed } from '@angular/core/testing';

import { MudaTema } from './muda-tema';

describe('MudaTema', () => {
  let service: MudaTema;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MudaTema);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
