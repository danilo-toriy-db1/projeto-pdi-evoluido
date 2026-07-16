import { Component, ElementRef, signal, viewChild } from '@angular/core';
import { LoginForm } from '../login-form/login-form';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.html',
  styleUrl: './login-modal.scss',
  standalone: false
})
export class LoginModal {
  private modal = viewChild<ElementRef<HTMLDialogElement>>('modalLogin');
  private loginForm = viewChild(LoginForm);
  cadastro = signal<boolean>(false);

  abrirModal(registro?: boolean){
    if(registro){
      this.cadastro.set(true);
    } else {
      this.cadastro.set(false);
    }

    this.modal()?.nativeElement.showModal();
  }

  fecharModal(){
    this.loginForm()?.resetModal();
    this.cadastro.set(false);
    this.modal()?.nativeElement.close();
  }
}
