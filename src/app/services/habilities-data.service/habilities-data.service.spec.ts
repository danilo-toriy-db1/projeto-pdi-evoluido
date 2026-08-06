import { TestBed } from '@angular/core/testing';

import { HabilitiesDataService } from './habilities-data.service';
import { LocalStorageService } from '../local-storage.service/local-storage.service';
import { DadosMock } from '../dados-mock/dados-mock';
import { ArrayHabilitiesModel } from '../../models/array-habilities.model';
import { TipoHabilidade } from '../../models/enums/tipo-habilidade';
import { HabilitiesModel } from '../../models/habilities.model';

describe('HabilitiesDataService', () => {
  let service: HabilitiesDataService;
  let localStorageService: LocalStorageService;
  let localStorageServiceGetSpy: jest.SpyInstance;
  let localStorageServicePostSpy: jest.SpyInstance;
  let serviceDadosMock: DadosMock;
  let dadosMockReal: ArrayHabilitiesModel[];

  beforeEach(() => {
    TestBed.configureTestingModule({});
    localStorageService = TestBed.inject(LocalStorageService);
    localStorageServiceGetSpy = jest.spyOn(localStorageService, 'get');
    localStorageServicePostSpy = jest.spyOn(localStorageService, 'post');    
    serviceDadosMock = TestBed.inject(DadosMock);
    dadosMockReal = serviceDadosMock.habilities;
  });

  afterEach(() => {
    localStorage.clear();
    jest.resetAllMocks(); 
  })

  describe('Teste da lógica do construtor', () => {
      it('Deve carregar dados do LocalStorage se existir', () => {
        const dadosMockLocal = [{ id: 9999, habilidade: { habilidade: 'Teste', tipo: TipoHabilidade.HARD }}];
        localStorageServiceGetSpy.mockReturnValue(dadosMockLocal);
  
        service = TestBed.inject(HabilitiesDataService);
  
        expect(localStorageServiceGetSpy).toHaveBeenCalledWith('habilities');
        expect(service.habilities()).toEqual(dadosMockLocal);
        expect(localStorageServicePostSpy).not.toHaveBeenCalledWith('habilities');
      });
  
      it('Deve carregar dados do DadosMock e salvar no LocalStorage se não existir dados lá', () => {
        localStorageServiceGetSpy.mockReturnValue([]);
  
        service = TestBed.inject(HabilitiesDataService);
  
        expect(service.habilities()).toEqual(dadosMockReal);
        expect(localStorageServiceGetSpy).toHaveBeenCalledWith('habilities');
        expect(localStorageServicePostSpy).toHaveBeenCalledWith('habilities', serviceDadosMock.habilities);
      })
    });

    describe('Teste da lógica do CRUD de habilidades', () => {
      beforeEach(() => {
        localStorageServiceGetSpy.mockReturnValue(dadosMockReal);
        service = TestBed.inject(HabilitiesDataService);
      });

      describe('Teste do Update', () => {
        it('Deve atualizar o nome da habilidade corretamente', () => {
          const habilidadeParaAtualizar: ArrayHabilitiesModel = { 
            id: 2,
            habilidade: {
              habilidade: "Teste Update",
              tipo: TipoHabilidade.HARD
            }
          }

          service.updateHabilities(habilidadeParaAtualizar);

          expect(service.habilities()![1].habilidade['habilidade']).toEqual(habilidadeParaAtualizar.habilidade.habilidade);
          expect(localStorageServicePostSpy).toHaveBeenCalledWith('habilities', service.habilities());
        });

        it('Deve atualizar o tipo da habilidade corretamente', () => {
          const habilidadeParaAtualizar: ArrayHabilitiesModel = { 
            id: 3,
            habilidade: {
              habilidade: "JavaScript",
              tipo: TipoHabilidade.SOFT
            }
          }

          service.updateHabilities(habilidadeParaAtualizar);

          expect(service.habilities()![2].habilidade['tipo']).toEqual(habilidadeParaAtualizar.habilidade.tipo);
          expect(localStorageServicePostSpy).toHaveBeenCalledWith('habilities', service.habilities());
        })
      });
   
      describe('Teste do Delete e do Post', () => {
        it('Deve adicionar uma habilidade nova corretamente', () => {
            const novaHabilidade: HabilitiesModel = { 
              habilidade: "Teste Post",
              tipo: TipoHabilidade.SOFT
            }
            const tamanhoOriginal = service.habilities().length;

            service.postHabilities(novaHabilidade);
            const ultimoItem = service.habilities()[service.habilities().length - 1];
            
            expect(service.habilities().length).toBe(tamanhoOriginal + 1);
            expect(ultimoItem.id).toBe(tamanhoOriginal + 1);
            expect(ultimoItem.habilidade.habilidade).toBe(novaHabilidade.habilidade);
            expect(ultimoItem.habilidade.tipo).toBe(novaHabilidade.tipo);
            expect(localStorageServicePostSpy).toHaveBeenCalledWith('habilities', service.habilities());
        });

        it('Deve remover uma habilidade corretamente', () => {
          const habilidadeParaDeletar = service.habilities()[2];
          const tamanhoOriginal = service.habilities().length;

          service.deleteHabilityById(habilidadeParaDeletar);

          expect(service.habilities().length).toBe(tamanhoOriginal - 1);
          expect(service.habilities()[2].id).not.toBe(habilidadeParaDeletar.id);
          expect(localStorageServicePostSpy).toHaveBeenCalledWith('habilities', service.habilities());
        });
      })
    });

    it('should be created', () => {
      expect(service).toBeTruthy();
    });
  });
