import { Injectable, signal } from '@angular/core';
import { FormFeedbackOutput } from '../../models/enums/form-feedback-output';

@Injectable({
  providedIn: 'root',
})
export class RenderizaFeedbackService {

  statusModal = signal<string>('');
  mensagemFeedback = signal<string>('');

  async gerarModalFeedback(emitter: FormFeedbackOutput, mensagem?: string){
    this.statusModal.set('carregando');
    await this.aguardarSegundos(5000);

    if(mensagem){
      this.mensagemFeedback.set(mensagem);
    }

    switch (emitter) {
      case FormFeedbackOutput.SUCCESS:
        this.statusModal.set('sucesso');
        await this.aguardarSegundos(3000);
        break;

      case FormFeedbackOutput.FORBIDDEN:
        this.statusModal.set('erro');
        this.mensagemFeedback.set('Acesso Negado!');
        await this.aguardarSegundos(4000);
        break;
      
      case FormFeedbackOutput.MISMATCH:
        this.statusModal.set('erro');
        this.mensagemFeedback.set('Credenciais Inválidas!');
        await this.aguardarSegundos(4000);
        break;
      
      default:
        this.statusModal.set('erro');
        await this.aguardarSegundos(4000);
        break;
    }

    this.mensagemFeedback.set('');
    this.statusModal.set('');
  }
  
  private aguardarSegundos(ms: number): Promise<void> {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
}
