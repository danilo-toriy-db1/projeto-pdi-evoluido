import { Injectable, signal } from '@angular/core';
import { DadosMock } from '../dados-mock/dados-mock';
import { LocalStorageService } from '../local-storage.service/local-storage.service';
import { Users } from '../../models/users';
import { Roles } from '../../models/enums/roles';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  usuarios = signal<Users[]>([]);


  constructor(private localStorageService: LocalStorageService,
              private dados: DadosMock
  ){
      const dadosLocal = this.localStorageService.get<Users[]>('users');
      if(dadosLocal && dadosLocal.length > 0 ){
        this.usuarios.set(dadosLocal);
      }else{
        this.usuarios.set(this.dados.users);
        this.localStorageService.post<Users[]>('users', this.dados.users);
        this.localStorageService.post<boolean>('activeSession', false);
        this.localStorageService.post<Roles>('activeUserRole', Roles.USUARIO);
      }
  }

  updateUser(usuario: Users){
    const usuarios = this.usuarios();

    const userUpdated = usuarios.map((usuarioItem: Users) => {
      if (usuarioItem.id === usuario.id){
        return usuario
      } 
      return usuarioItem 
      
    });
  
      this.localStorageService.post<Users[]>('users', userUpdated);
      this.usuarios.set(userUpdated);
    }
  
  postUser(usuario: Users){
    const usuarios = this.usuarios();
    const novoUsuario = {
      id: this.getNextId(usuarios),
      user: usuario.user,
      password: usuario.password,
      role: usuario.role === 'user'
            ? Roles.USUARIO
            : Roles.ADMIN
    }

    usuarios.push(novoUsuario)
    this.localStorageService.post<Users[]>('users', usuarios);
    this.usuarios.set(usuarios);
  }
  
  deleteUserById(usuario: Users){
    const usuarios = this.usuarios();

    const arrayIndex = usuarios.findIndex((item) => {
      return item.id === usuario.id
    });

    if(arrayIndex === -1){
      console.log('Não foi possível achar o Index no Array de Usuários. Operação cancelada');
      return;
    }

    usuarios.splice(arrayIndex, 1);
    this.localStorageService.post<Users[]>('users', usuarios);
  }

  private getNextId(usuarios: Users[]): number {
    const novoId = usuarios.reduce((maiorId, usuarioAtual) => {
      return usuarioAtual.id > maiorId
              ? usuarioAtual.id
              : maiorId
    }, 0);

    return novoId + 1;
  }
}
