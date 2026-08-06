import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { LocalStorageService } from '../local-storage.service/local-storage.service';
import { DadosMock } from '../dados-mock/dados-mock';
import { Users } from '../../models/users';
import { Roles } from '../../models/enums/roles';

describe('UserService', () => {
  let service: UserService;
  let localStorageService: LocalStorageService;
  let localStorageServiceGetSpy: jest.SpyInstance;
  let localStorageServicePostSpy: jest.SpyInstance;
  let serviceDadosMock: DadosMock;
  let dadosMockReal: Users[];

  beforeEach(() => {
    TestBed.configureTestingModule({});
    localStorageService = TestBed.inject(LocalStorageService);
    localStorageServiceGetSpy = jest.spyOn(localStorageService, 'get');
    localStorageServicePostSpy = jest.spyOn(localStorageService, 'post');    
    serviceDadosMock = TestBed.inject(DadosMock);
    dadosMockReal = serviceDadosMock.users;
  });

  afterEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  describe('Teste da lógica do Construtor', () => {
    it('Deve carregar dados do LocalStorage se houver', () => {
      localStorageServiceGetSpy.mockReturnValue(dadosMockReal);

      service = TestBed.inject(UserService);

      expect(service.usuarios()).toEqual(dadosMockReal);
      expect(localStorageServicePostSpy).not.toHaveBeenCalled();
    });

    it('Deve carregar dados Mock e salvar no LocalStorage se não existir lá', () => {
      localStorageServiceGetSpy.mockReturnValue([]);

      service = TestBed.inject(UserService);

      expect(localStorageServicePostSpy).toHaveBeenCalledWith('users', dadosMockReal);
      expect(localStorageServicePostSpy).toHaveBeenCalledWith('activeSession', false);
      expect(localStorageServicePostSpy).toHaveBeenCalledWith('activeUserRole', Roles.USUARIO);
    });
  });

  describe('Teste do CRUD', () => {
    beforeEach(() => {
      localStorageServiceGetSpy.mockReturnValue(dadosMockReal);
      service = TestBed.inject(UserService);
    });

    it('Deve criar (CREATE/POST) um usuário com ID sequencial auto-incrementado', () => {
      const tamanhoOriginal = service.usuarios().length;
      const novoUsuario: Users = { id: -1, user: 'Tester', password: '123', role: Roles.USUARIO };

      service.postUser(novoUsuario);

      const novoUsuarioArmazenado = service.usuarios()[service.usuarios().length - 1];
      expect(service.usuarios().length).toBe(tamanhoOriginal + 1);
      expect(novoUsuarioArmazenado.id).not.toBe(-1);
      expect(novoUsuarioArmazenado.user).toBe(novoUsuario.user);
      expect(novoUsuarioArmazenado.password).toBe(novoUsuario.password);
      expect(novoUsuarioArmazenado.role).toBe(novoUsuario.role);
      expect(localStorageServicePostSpy).toHaveBeenCalledWith('users', service.usuarios());
    });

    it('Deve atualizar (UPDATE) um usuário corretamente', () => {
      const usuarioOriginal = service.usuarios()[0];
      const usuarioAtualizado: Users= { ...usuarioOriginal, user: 'Teste update' };

      service.updateUser(usuarioAtualizado);

      expect(service.usuarios()[0].user).toBe(usuarioAtualizado.user);
      expect(localStorageServicePostSpy).toHaveBeenCalledWith('users', service.usuarios());
    });

    it('Deve apagar (DELETE) um usuário corretamente se achar o ID (caminho feliz)', () => {
      const tamanhoOriginal = service.usuarios().length;
      const usuarioParaApagar = service.usuarios()[0];

      service.deleteUserById(usuarioParaApagar);

      expect(service.usuarios().length).toBe(tamanhoOriginal - 1);
      expect(service.usuarios()[0].id).not.toBe(usuarioParaApagar.id);
      expect(localStorageServicePostSpy).toHaveBeenCalledWith('users', service.usuarios());
    });

    it('Deve cancelar o DELETE e logar erro em caso do ID não ser encontrado (caminho triste)', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      const tamanhoOriginal = service.usuarios().length;
      const usuarioInexistente = { id: 99999, user: 'Teste erro', password: 'a', role: Roles.USUARIO };

      service.deleteUserById(usuarioInexistente);

      expect(service.usuarios().length).toBe(tamanhoOriginal);
      expect(consoleSpy).toHaveBeenCalled;
      expect(localStorageServicePostSpy).not.toHaveBeenCalled();
    });

    it('should be created', () => {
      expect(service).toBeTruthy();
    });
  });
});
