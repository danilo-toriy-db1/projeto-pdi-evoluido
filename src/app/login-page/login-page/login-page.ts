import { Component, viewChild } from '@angular/core';
import { LoginModal } from '../components/login-modal/login-modal';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
  standalone: false
})
export class LoginPage {
  private modal = viewChild(LoginModal);
  
  abrirModal(){
    this.modal()?.abrirModal();
  }

}
