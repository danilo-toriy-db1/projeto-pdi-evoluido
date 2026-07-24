import { Component, effect, signal } from '@angular/core';
import { Users } from '../../../models/users';
import { UsersService } from '../../shared/services/users-service';

@Component({
  selector: 'app-card-users',
  standalone: false,
  templateUrl: './card-users.html',
  styleUrl: './card-users.scss',
})
export class CardUsers {

  usuarios = signal<Users[]>([]);

  constructor(private usersService: UsersService){
    effect(() => {
      const usuarios = this.usersService.usuarios();

      if(!usuarios){
        return
      }

      this.usuarios.set(usuarios);
    });
  }
}
