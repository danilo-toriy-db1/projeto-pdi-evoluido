import { TestBed } from '@angular/core/testing';

import { PaginaAtualState } from './troca-pagina';

describe('UserService', () => {
  let service: PaginaAtualState;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaginaAtualState);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
