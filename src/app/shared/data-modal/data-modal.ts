import { Component, effect, ElementRef, input, signal, viewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AboutPersonalDataShared } from '../../models/about-personal-data-shared';
import { AboutMeDataService } from '../../services/about-me-data-service/about-me-data-service';
import { FormFeedbackOutput } from '../../models/enums/form-feedback-output';
import { VisualFeedbackModal } from "../visual-feedback-modal/visual-feedback-modal/visual-feedback-modal";

@Component({
  selector: 'app-data-modal',
  standalone: true,
  imports: [ReactiveFormsModule, VisualFeedbackModal],
  templateUrl: './data-modal.html',
  styleUrl: './data-modal.scss',
})
export class DataModal {

  dataForm!: FormGroup;
  dadoRecebido = input<AboutPersonalDataShared | null>();
  private modal = viewChild<ElementRef<HTMLDialogElement>>('dataModal');
  private primeiraRenderizacaoFlag: boolean = true;
  mostraFeedback = false;
  statusModal = signal<string>('');
  mensagemFeedback = signal<string>('');

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
    this.statusModal.set('');
    this.modal()?.nativeElement.showModal();
  }

  fecharModal(){
    this.mostraFeedback = false;
    this.statusModal.set('');
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
    this.statusModal.set('carregando');
    await this.aguardarSegundos(5000);

    switch (status) {
      case FormFeedbackOutput.SUCCESS:
        if(mensagem){
          this.mensagemFeedback.set(mensagem);
        }
        this.statusModal.set('sucesso');
        await this.aguardarSegundos(3000);
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
