import { Component, effect, ElementRef, input, viewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Users } from '../../../models/users';
import { Roles } from '../../../models/enums/roles';
import { UserService } from '../../../services/user.service/user.service';

@Component({
  selector: 'app-user-modal',
  standalone: false,
  templateUrl: './user-modal.html',
  styleUrl: './user-modal.scss',
})
export class UserModal {
  
  userEditForm!: FormGroup;
  usuarioSelecionado = input<Users | null>();
  modoCadastro = input<boolean>();
  private modal = viewChild<ElementRef<HTMLDialogElement>>('userEditModal');
  protected readonly roles = Roles;

  constructor(private fb: FormBuilder,
              private userService: UserService
  ){
    this.userEditForm = this.fb.group({
      username: [''],
      password: [''],
      role: [''],
      confirm: ['']
    })

    effect(() => {
      const user = this.usuarioSelecionado();

      if(!this.usuarioSelecionado()){
        console.error('Não foi possível capturar os dados do usuário selecionado');
        return;
      }

      if(this.modoCadastro()){
        this.configModalAdicionar();
        return;
      }

      this.userEditForm.patchValue({
        username: this.usuarioSelecionado()?.user,
        password: this.usuarioSelecionado()?.password,
        role: this.usuarioSelecionado()?.role === this.roles.ADMIN
                                                  ? this.roles.ADMIN
                                                  : this.roles.USUARIO
      })
    })
  }

  abrirModal(){
    this.modal()?.nativeElement.showModal();
  }

  fecharModal(){
    this.modal()?.nativeElement.close();
  }

  configModalAdicionar(){
    this.userEditForm.reset();
    this.abrirModal();
  }

  enviarDados(){
    const usuarioAntigo = this.usuarioSelecionado();
    const usuarioAtualizado: Users = {
      id: usuarioAntigo!.id,
      user: this.userEditForm.get('username')?.value,
      password: this.userEditForm.get('password')?.value,
      role: this.userEditForm.get('role')?.value
    }
    
    this.userService.updateUser(usuarioAtualizado);
    this.fecharModal();
  }

  removerUsuario(){
    const usuario = this.usuarioSelecionado() as Users;
    this.userService.deleteUserById(usuario);
    this.fecharModal();
  }

  adicionarUsuario(){
    const novoUsuario: Users = {
      id: -1,
      user: this.userEditForm.get('username')?.value,
      password: this.userEditForm.get('password')?.value,
      role: this.userEditForm.get('role')?.value
    }

    const confirm = this.userEditForm.get('confirm')?.value;

    if(novoUsuario.password !== confirm){
      alert('A confirmação de senha está incorreta!');
      this.fecharModal();
      return;
    }

    this.userService.postUser(novoUsuario);
    this.fecharModal();
  }
}
