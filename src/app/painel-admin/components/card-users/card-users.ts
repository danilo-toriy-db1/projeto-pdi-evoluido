import { Component, effect, signal, viewChild } from '@angular/core';
import { Users } from '../../../models/users';
import { UserModal } from '../../../shared/user-modal/user-modal';
import { UserService } from '../../../services/user.service/user.service';

@Component({
  selector: 'app-card-users',
  standalone: false,
  templateUrl: './card-users.html',
  styleUrl: './card-users.scss',
})
export class CardUsers {

  modalRef = viewChild(UserModal);
  usuarioSelecionado = signal<Users | null>(null)
  usuarios = signal<Users[]>([]);
  modoCadastro = signal<boolean>(false);

  constructor(private userService: UserService){
    effect(() => {
      const usuarios = this.userService.usuarios();

      if(!usuarios){
        return
      }

      this.usuarios.set(usuarios);
    });
  }

  abrirModal(usuario: Users){
    this.modoCadastro.set(false);
    this.usuarioSelecionado.set(usuario);
    this.modalRef()?.abrirModal();
  }

  abrirModalAdicionar(){
    this.modoCadastro.set(true);
    this.modalRef()?.abrirModal();
  }
}
