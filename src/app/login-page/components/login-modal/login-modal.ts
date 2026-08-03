import { Component, ElementRef, inject, signal, viewChild } from '@angular/core';
import { LoginForm } from '../login-form/login-form';
import { Router } from '@angular/router';
import { FormFeedbackOutput } from '../../../models/enums/form-feedback-output';
import { RenderizaFeedbackService } from '../../../services/renderiza-feedback.service/renderiza-feedback.service';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.html',
  styleUrl: './login-modal.scss',
  standalone: false
})
export class LoginModal {

  private router = inject(Router);
  private renderizaFeedbackService = inject(RenderizaFeedbackService);
  private modal = viewChild<ElementRef<HTMLDialogElement>>('modalLogin');
  private loginForm = viewChild(LoginForm);
  cadastro = signal<boolean>(false);
  mostraFeedback = false;
  statusModal = this.renderizaFeedbackService.statusModal;
  mensagemFeedback = this.renderizaFeedbackService.mensagemFeedback;

  abrirModal(registro?: boolean){
    this.mostraFeedback = false;

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
    this.modal()?.nativeElement.close();
  }

  async aguardarFeedback(emitter: FormFeedbackOutput){
    this.mostraFeedback = true;

    switch (emitter) {
      case FormFeedbackOutput.SUCCESS:
        await this.renderizaFeedbackService.gerarModalFeedback(emitter)
        this.router.navigate(['/admin']);
        break;

      case FormFeedbackOutput.FORBIDDEN:
        await this.renderizaFeedbackService.gerarModalFeedback(emitter, 'Acesso Negado!!');
        this.router.navigate(['/login']);
        break;
      
      case FormFeedbackOutput.MISMATCH:
        await this.renderizaFeedbackService.gerarModalFeedback(emitter, 'Credenciais Inválidas!');
        this.router.navigate(['/login']);
        break;
      
      default:
        await this.renderizaFeedbackService.gerarModalFeedback(emitter)
        break;
    }

    this.mostraFeedback = false;
    this.fecharModal();
  }
}
