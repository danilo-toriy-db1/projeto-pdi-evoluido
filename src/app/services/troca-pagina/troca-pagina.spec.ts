import { TestBed } from '@angular/core/testing';

import { PaginaAtualState } from './troca-pagina';
import { PagesNames } from '../../models/enums/pages-names';

describe('UserService', () => {
  let service: PaginaAtualState;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaginaAtualState);
  });

  describe('Teste do método trocaPagina()', () => {
    it('Deve iniciar com o valor inicial de INITIAL_PAGE', () => {
      expect(service.paginaAtual()).toBe(PagesNames.INITIAL_PAGE);
    });

    it('Deve atualizar a página para o valor passado como parâmetro', () => {
      const pagina = PagesNames.CONTACT_PAGE;

      service.trocaPagina(pagina);

      expect(service.paginaAtual()).toBe(pagina);
    })
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
