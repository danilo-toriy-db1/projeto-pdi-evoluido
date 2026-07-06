import { Component, ElementRef, viewChild } from '@angular/core';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.html',
  styleUrl: './login-modal.scss',
  standalone: false
})
export class LoginModal {
  private modal = viewChild<ElementRef<HTMLDialogElement>>('modalLogin');

  abrirModal(){
    this.modal()?.nativeElement.showModal();
  }

  fecharModal(){
    this.modal()?.nativeElement.close();
  }
}
