import { Component, effect, ElementRef, inject, input, signal, viewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AboutPersonalDataShared } from '../../models/about-personal-data-shared';
import { AboutMeDataService } from '../../services/about-me-data-service/about-me-data-service';
import { FormFeedbackOutput } from '../../models/enums/form-feedback-output';
import { VisualFeedbackModal } from "../visual-feedback-modal/visual-feedback-modal/visual-feedback-modal";
import { RenderizaFeedbackService } from '../../services/renderiza-feedback.service/renderiza-feedback.service';

@Component({
  selector: 'app-data-modal',
  standalone: true,
  imports: [ReactiveFormsModule, VisualFeedbackModal],
  templateUrl: './data-modal.html',
  styleUrl: './data-modal.scss',
})
export class DataModal {

  private renderizaFeedbackService = inject(RenderizaFeedbackService)

  dataForm!: FormGroup;
  dadoRecebido = input<AboutPersonalDataShared | null>();
  private modal = viewChild<ElementRef<HTMLDialogElement>>('dataModal');
  private primeiraRenderizacaoFlag: boolean = true;
  mostraFeedback = false;
  statusModal = this.renderizaFeedbackService.statusModal;
  mensagemFeedback = this.renderizaFeedbackService.mensagemFeedback;

  constructor(private fb: FormBuilder,
              private aboutMeDataService: AboutMeDataService
  ){
    this.dataForm = this.fb.group({
      nome: [''],
      idade: ['', [Validators.pattern('^[0-9]*$')]],
      carreira: [''],
      profissao: [''],
      empresa: [''],
      imagemPerfil: [null]
    });

    effect(() => {
      const dados = this.dadoRecebido();

      if(!dados){
        if(!this.primeiraRenderizacaoFlag){
          console.error('Erro ao buscar os dados pessoais');
          return;
        }

        this.primeiraRenderizacaoFlag = false;
        return;
      }

      this.primeiraRenderizacaoFlag = false;
      this.dataForm.patchValue({
        nome: dados.nome,
        idade: dados.idade,
        carreira: dados.carreira,
        profissao: dados.profissao,
        empresa: dados.empresa
      })
    })
  }

  abrirModal(){
    this.mostraFeedback = false;
    this.modal()?.nativeElement.showModal();
  }

  fecharModal(){
    this.mostraFeedback = false;
    this.modal()?.nativeElement.close();
  }

  enviarDados(){
    const dadoAntigo = this.dadoRecebido() as AboutPersonalDataShared;
    const dadosAtualizados: AboutPersonalDataShared = {
      id: dadoAntigo.id,
      nome: this.dataForm.get('nome')?.value,
      idade: this.dataForm.get('idade')?.value,
      carreira: this.dataForm.get('carreira')?.value,
      profissao: this.dataForm.get('profissao')?.value,
      empresa: this.dataForm.get('empresa')?.value
    }
    this.aboutMeDataService.updatePersonalData(dadosAtualizados);
    this.aguardarFeedback(FormFeedbackOutput.SUCCESS, 'Dados Pessoais Atualizados com Sucesso!!');
  }

  async aguardarFeedback(status: FormFeedbackOutput, mensagem?: string){
    this.mostraFeedback = true;
    await this.renderizaFeedbackService.gerarModalFeedback(status, mensagem);

    this.mostraFeedback = false;
    this.fecharModal();
  }
}
