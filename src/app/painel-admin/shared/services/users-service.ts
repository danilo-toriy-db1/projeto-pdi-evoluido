import { Injectable, signal } from '@angular/core';
import { LocalStorageService } from '../../../services/local-storage.service/local-storage.service';
import { Users } from '../../../models/users';

@Injectable({
  providedIn: 'root',
})
export class UsersService {

  usuarios = signal<Users[]>([]);

  constructor(private localStorageService: LocalStorageService){
    const dados = this.localStorageService.get('users');
    this.usuarios.set(dados);    
  }


}
