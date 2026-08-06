import { TestBed } from '@angular/core/testing';

import { MudaTema } from './muda-tema';
import { LocalStorageService } from '../local-storage.service/local-storage.service';

describe('MudaTema', () => {
  let service: MudaTema;
  let localStorageService: LocalStorageService;
  let localStorageServiceGetSpy: jest.SpyInstance;
  let localStorageServicePostSpy: jest.SpyInstance;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    localStorageService = TestBed.inject(LocalStorageService);
    localStorageServiceGetSpy = jest.spyOn(localStorageService, 'get');
    localStorageServicePostSpy = jest.spyOn(localStorageService, 'post');   
  });

  afterEach(() => {
    jest.clearAllMocks();
  })

  describe('Teste da lógica do construtor', () => {
    it('Deve definir o tema como DARK se não houver nada salvo no LocalStorage', () => {
      localStorageServiceGetSpy.mockReturnValue(null);

      const service = TestBed.inject(MudaTema);

      expect(localStorageServiceGetSpy).toHaveBeenCalledWith('tema');
      expect(service.darkMode()).toBe(true);
      expect(localStorageServicePostSpy).toHaveBeenCalledWith('tema', 'dark');
    });
  });

  describe('Teste da alternância de modos', () => {
    beforeEach(() => {
      service = TestBed.inject(MudaTema);
    });

    it('Deve alterar para LIGHT se o modo atual for DARK', () => {
      service.darkMode.set(true);

      service.alternarTema();

      expect(service.darkMode()).toBe(false);
      expect(localStorageServicePostSpy).toHaveBeenCalledWith('tema', 'light');
    });

    it('Deve alterar para DARK se o modo atual for LIGHT', () => {
      service.darkMode.set(false);
      
      service.alternarTema();

      expect(service.darkMode()).toBe(true);
      expect(localStorageServicePostSpy).toHaveBeenCalledWith('tema', 'dark');
    });
    
    it('should be created', () => {
      expect(service).toBeTruthy();
    });
  });
});
