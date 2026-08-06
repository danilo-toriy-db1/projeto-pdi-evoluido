import { Injectable, signal } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service/local-storage.service';
import { Roles } from '../../models/enums/roles';
import type { Users } from '../../models/users';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = signal<boolean>(false);
  private userRole = signal<Roles>(Roles.USUARIO);

  constructor(private localStorageService: LocalStorageService){
    this.activeSession();
  }

  private activeSession(){
    const activeSession = this.localStorageService.get<boolean>('activeSession');
    if(activeSession === true){
      this.isAuthenticated.set(true);

      const activeUserRole = this.localStorageService.get<Roles>('activeUserRole');
      if(activeUserRole === Roles.ADMIN || activeUserRole === Roles.USUARIO){
        this.userRole.set(activeUserRole);
      }
    }
  }

  login(user: string, password: string): boolean{
    const dadosLocal = this.localStorageService.get<Users[]>('users');
    if(!dadosLocal){
      return false;
    }

    const usuarioEncontrado = dadosLocal.find(
      (userItem) => userItem.user === user && userItem.password === password);
    
    if(usuarioEncontrado){
      this.isAuthenticated.set(true);
      this.userRole.set(usuarioEncontrado.role);
      this.localStorageService.post<boolean>('activeSession', true);
      this.localStorageService.post<Roles>('activeUserRole', usuarioEncontrado.role);
      return true;
    }
    return false;
  }

  logout(){
    this.isAuthenticated.set(false);
    this.userRole.set(Roles.USUARIO);
    this.localStorageService.post<boolean>('activeSession', false);
    this.localStorageService.post<null>('activeUserRole', null);
  }

  haveLogin(): boolean{
    return this.isAuthenticated();
  }

  getRole(): Roles{
    return this.userRole();
  }

  getAuthentication(): boolean{
    return this.isAuthenticated();
  } 
}
