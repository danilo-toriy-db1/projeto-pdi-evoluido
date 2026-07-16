import { Component, viewChild } from '@angular/core';
import { LoginModal } from '../components/login-modal/login-modal';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
  standalone: false
})
export class LoginPage {
  private modal = viewChild(LoginModal);
  
  constructor(private router: Router){}

  abrirModal(){
    this.modal()?.abrirModal();
  }

  abrirModalCadastro(){
    this.modal()?.abrirModal(true);
  }

  navegarPaginaInicial(){
    this.router.navigate(['/landing-page']);
  }

}
