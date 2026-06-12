import { TestBed } from '@angular/core/testing';

import { DadosMock } from './dados-mock';

describe('DadosMock', () => {
  let service: DadosMock;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DadosMock);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
