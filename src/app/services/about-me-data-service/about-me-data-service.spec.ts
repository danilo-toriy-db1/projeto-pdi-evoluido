import { TestBed } from '@angular/core/testing';

import { AboutMeDataService } from './about-me-data-service';
import { LocalStorageService } from '../local-storage.service/local-storage.service';
import { DadosMock } from '../dados-mock/dados-mock';
import { AboutDataShared } from '../../models/about-data-shared.model';
import { ArrayAboutModel } from '../../models/array-about.model';
import { AboutPersonalDataShared } from '../../models/about-personal-data-shared';

describe('AboutMeDataService', () => {
  let service: AboutMeDataService;
  let localStorageService: LocalStorageService;
  let localStorageServiceGetSpy: jest.SpyInstance;
  let localStorageServicePostSpy: jest.SpyInstance;
  let serviceDadosMock: DadosMock;
  let dadosMockReal: ArrayAboutModel[];

  beforeEach(() => {
    TestBed.configureTestingModule({});
    localStorageService = TestBed.inject(LocalStorageService);
    localStorageServiceGetSpy = jest.spyOn(localStorageService, 'get');
    localStorageServicePostSpy = jest.spyOn(localStorageService, 'post');    
    serviceDadosMock = TestBed.inject(DadosMock);
    dadosMockReal = serviceDadosMock.about;
  });

  afterEach(() => {
    localStorage.clear();
    jest.resetAllMocks(); 
  });

  describe('Teste da lógica do construtor', () => {
    it('Deve carregar dados do LocalStorage se existir', () => {
      const dadosMockLocal = [{ id: 9999, dados: { nome: 'Teste' }}];
      localStorageServiceGetSpy.mockReturnValue(dadosMockLocal);

      service = TestBed.inject(AboutMeDataService);

      expect(localStorageServiceGetSpy).toHaveBeenCalledWith('personalData');
      expect(service.dadosAboutMe()).toEqual(dadosMockLocal);
      expect(localStorageServicePostSpy).not.toHaveBeenCalledWith('personalData');
    });

    it('Deve carregar dados do DadosMock e salvar no LocalStorage se não existir dados lá', () => {
      localStorageServiceGetSpy.mockReturnValue([]);

      service = TestBed.inject(AboutMeDataService);

      expect(service.dadosAboutMe()).toEqual(dadosMockReal);
      expect(localStorageServiceGetSpy).toHaveBeenCalledWith('personalData');
      expect(localStorageServicePostSpy).toHaveBeenCalledWith('personalData', serviceDadosMock.about);
    })
  });

  describe('Teste da lógica de atualização de dados e delete', () => {
    beforeEach(() => {
      localStorageServiceGetSpy.mockReturnValue(dadosMockReal);
      service = TestBed.inject(AboutMeDataService);
    })

    it('Deve atualizar um campo de Descrição corretamente', () => {
      const dado: AboutDataShared = {
        id: 1,
        dado: 'Explorando o teste',
        campo: 'hobbies'
      }

      service.updateDescriptionData(dado);

      expect(service.dadosAboutMe()![0].dados.descricao['hobbies']).toEqual(dado.dado);
      expect(localStorageServicePostSpy).toHaveBeenCalledWith('personalData', service.dadosAboutMe());
    });

    it('Deve deletar um dado corretamente de descrição e setar ele como sendo "Sem informações"', () => {
      service.deleteDescriptionContent(1, 'desgostos');

      
      expect(service.dadosAboutMe()![0].dados.descricao['desgostos']).toBe('Sem Informações');
      expect(localStorageServicePostSpy).toHaveBeenCalledWith('personalData', service.dadosAboutMe());
    });

    it('Deve atualizar os dados pessoais corretamente', () => {
      const dados: AboutPersonalDataShared = {
        id: 1,
        nome: 'Teste nome mudado',
        idade: 19,
        carreira: '',
        profissao: '',
        empresa: ''
      }

      service.updatePersonalData(dados);

      expect(service.dadosAboutMe()![0].dados.nome).toEqual('Teste nome mudado');
      expect(service.dadosAboutMe()![0].dados.idade).toEqual(19);
      expect(service.dadosAboutMe()![0].dados.carreira).toBe('');
      expect(service.dadosAboutMe()![0].dados.profissao).toBe('');
      expect(service.dadosAboutMe()![0].dados.empresa).toBe('');
      expect(localStorageServicePostSpy).toHaveBeenCalledWith('personalData', service.dadosAboutMe());
      })

    it('should be created', () => {
      expect(service).toBeTruthy();
    });
  });
});
