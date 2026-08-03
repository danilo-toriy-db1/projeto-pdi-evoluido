import { Component, ElementRef, inject, signal, viewChild } from '@angular/core';
import { LoginForm } from '../login-form/login-form';
import { Router } from '@angular/router';
import { FormFeedbackOutput } from '../../../models/enums/form-feedback-output';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.html',
  styleUrl: './login-modal.scss',
  standalone: false
})
export class LoginModal {

  private router = inject(Router);
  private modal = viewChild<ElementRef<HTMLDialogElement>>('modalLogin');
  private loginForm = viewChild(LoginForm);
  cadastro = signal<boolean>(false);
  mostraFeedback = false;
  statusModal = signal<string>('');
  mensagemFeedback = signal<string>('');

  abrirModal(registro?: boolean){
    this.mostraFeedback = false;
    this.statusModal.set('');

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
    this.mostraFeedback = false;
    this.statusModal.set('');
    this.modal()?.nativeElement.close();
  }

  async aguardarFeedback(emitter: FormFeedbackOutput){
    this.mostraFeedback = true;
    this.statusModal.set('carregando');
    await this.aguardarSegundos(5000);

    switch (emitter) {
      case FormFeedbackOutput.SUCCESS:
        this.statusModal.set('sucesso');
        await this.aguardarSegundos(3000);

        this.router.navigate(['/admin']);
        break;

      case FormFeedbackOutput.FORBIDDEN:
        this.statusModal.set('erro');
        this.mensagemFeedback.set('Acesso Negado!');
        await this.aguardarSegundos(4000);

        this.router.navigate(['/login']);
        break;
      
      case FormFeedbackOutput.MISMATCH:
        this.statusModal.set('erro');
        this.mensagemFeedback.set('Credenciais Inválidas!');
        await this.aguardarSegundos(4000);

        this.router.navigate(['/login']);
        break;
      
      default:
        this.statusModal.set('erro');
        await this.aguardarSegundos(4000);
        break;
    }

    this.mostraFeedback = false;
    this.mensagemFeedback.set('');
    this.fecharModal();
  }

  private aguardarSegundos(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
