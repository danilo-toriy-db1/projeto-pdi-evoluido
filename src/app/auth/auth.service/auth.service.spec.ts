import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { Roles } from '../../models/enums/roles';
import { LocalStorageService } from '../../services/local-storage.service/local-storage.service';


describe('AuthService', () => {
  let service: AuthService;
  let localStorageService: LocalStorageService;
  let localStorageServiceGetSpy: jest.SpyInstance;
  let localStorageServicePostSpy: jest.SpyInstance;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
    localStorageService = TestBed.inject(LocalStorageService);
    localStorageServiceGetSpy = jest.spyOn(localStorageService, 'get');
    localStorageServicePostSpy = jest.spyOn(localStorageService, 'post');
  });

  afterEach(() => {
    localStorage.clear();
    jest.resetAllMocks(); 
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getRole deve devolver um ENUM válido de Roles', () => {
    const retorno = service.getRole();

    const enumRole = Object.values(Roles);

    expect(enumRole).toContain(retorno);
  });

  describe('Teste do método de login', () => {
    it('Autenticação deve ser verdadeiro (caminho feliz)', () => {
      const usuarioValido = { 
          user: "userTeste", 
          password: "123",
          role: Roles.USUARIO
        };
      localStorageServiceGetSpy.mockReturnValue([usuarioValido]);

      const retornoLoginSucesso = service.login(usuarioValido.user, usuarioValido.password);
      expect(localStorageServiceGetSpy).toHaveBeenCalled();
      expect(retornoLoginSucesso).toBeTruthy();
      expect(service.haveLogin()).toBeTruthy();
      expect(service.getAuthentication()).toBeTruthy();
      expect(localStorageServicePostSpy).toHaveBeenCalledTimes(2);
    });

    it('Autenticação deve ser falso (caminho triste) com credenciais incorretas', () => {
      const usuarioInvalido = { 
          user: "userTesteErro", 
          password: "123",
          role: Roles.USUARIO
        };
      
      const retornoInicial = service.haveLogin();
      expect(retornoInicial).toBeFalsy();
      expect(service.getAuthentication()).toBeFalsy();
  
      const retornoLoginFalso = service.login(usuarioInvalido.user, usuarioInvalido.password);
      expect(retornoLoginFalso).toBeFalsy();
      expect(service.haveLogin()).toBeFalsy();
      expect(service.getAuthentication()).toBeFalsy();
    });
  });

  describe('Teste do método de logout', () => {
    it('Logout deve resetar tudo e mover de tela', () => {
      localStorageServiceGetSpy.mockReturnValue([{ user: 'userTeste', password: '123' }]);
      service.login('userTeste', '123');
      expect(localStorageServiceGetSpy).toHaveBeenCalled();

      service.logout();
  
      expect(service.haveLogin()).toBeFalsy();
      expect(service.getAuthentication()).toBeFalsy();
      expect(service.getRole()).toBe(Roles.USUARIO);
      expect(localStorageServicePostSpy).toHaveBeenCalledTimes(4);
    });
  });
});
