import { TestBed } from '@angular/core/testing';

import { LocalStorageService } from './local-storage.service';

describe('LocalStorageService', () => {
  let service: LocalStorageService;
  let getMethodSpy: jest.SpyInstance;
  let postMethodSpy: jest.SpyInstance;
  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageService);
    getMethodSpy = jest.spyOn(Storage.prototype, 'getItem');
    postMethodSpy = jest.spyOn(Storage.prototype, 'setItem');
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    localStorage.clear();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Método GET', () => {
    it('Deve retornar um objeto como JSON quando a chave existir (caminho feliz)', () => {
      const mock = { teste: 'Teste' };
      getMethodSpy.mockReturnValue(JSON.stringify(mock));

      const retorno = service.get<{ teste: 'Teste' }>('teste');

      expect(getMethodSpy).toHaveBeenCalledWith('teste');
      expect(retorno).toEqual(mock);
    });

    it('Deve retornar null quando a chave não existir (caminho feliz do erro)', () => {
      getMethodSpy.mockReturnValue(null);

      const retorno = service.get('testeVazio');

      expect(retorno).toBeNull();
    });

    it('Deve logar o erro se o JSON for inválido (caminho triste)', () => {
      getMethodSpy.mockReturnValue('JSON sem chave para dar erro');

      const retorno = service.get('chaveInvalida');

      expect(consoleErrorSpy).toHaveBeenCalled();
      expect(retorno).toBeNull();
    });
  });

  describe('Método POST', () => {
    it('Deve salvar o objeto como string corretamente (caminho feliz)', () => {
      const mock = { teste: 'Teste', numero: 21 };

      service.post('testePost', mock);

      expect(postMethodSpy).toHaveBeenCalledWith('testePost', JSON.stringify(mock));
    });

    it('Deve logar erro se falhar em salvar (caminho triste - QuotaExceedError)', () => {
      postMethodSpy.mockImplementation(() => {
        throw new Error("QuotaExceedError");
      });

      service.post('chave', { valor: 'Teste' });

      expect(consoleErrorSpy).toHaveBeenCalled();
    })
  })
});
