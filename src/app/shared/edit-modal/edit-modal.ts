import { Component, effect, ElementRef, inject, input, OnInit, signal, viewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ArrayHabilitiesModel } from '../../models/array-habilities.model';
import { HabilitiesDataService } from '../../services/habilities-data.service/habilities-data.service';
import { AboutMeDataService } from '../../services/about-me-data-service/about-me-data-service';
import { HabilitiesModel } from '../../models/habilities.model';
import { TipoHabilidade } from '../../models/enums/tipo-habilidade';
import { AboutDataShared } from '../../models/about-data-shared.model';
import { FormFeedbackOutput } from '../../models/enums/form-feedback-output';
import { VisualFeedbackModal } from "../visual-feedback-modal/visual-feedback-modal/visual-feedback-modal";
import { RenderizaFeedbackService } from '../../services/renderiza-feedback.service/renderiza-feedback.service';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.html',
  styleUrl: './edit-modal.scss',
  standalone: true,
    imports: [ReactiveFormsModule, VisualFeedbackModal]
})
export class EditModal{

  private renderizaFeedbackService = inject(RenderizaFeedbackService);
  editForm!: FormGroup;
  grupoCard = input<'habilidade' | 'dados'>();
  dadoRecebido = input<ArrayHabilitiesModel | AboutDataShared | null>();
  adicionaHabilidade = signal<boolean>(false);
  private modal = viewChild<ElementRef<HTMLDialogElement>>('editModal');
  mostraFeedback = false;

  statusModal = this.renderizaFeedbackService.statusModal;
  mensagemFeedback = this.renderizaFeedbackService.mensagemFeedback;

  constructor(private fb: FormBuilder,
              private habilitiesDataService: HabilitiesDataService,
              private aboutMeDataService: AboutMeDataService
  ){
    this.editForm = this.fb.group({
      campoTexto: [''],
      tipo: ['']
    });

    effect(() => {
      const dados = this.dadoRecebido();

      if(!dados && !this.adicionaHabilidade()){
        this.editForm.reset();
        return;
      }

      switch (this.grupoCard()) {
        case 'habilidade':
          this.abrirModal(true);
          const dadosHabilidades = dados as ArrayHabilitiesModel;
          this.editForm.patchValue({
            campoTexto : dadosHabilidades.habilidade.habilidade,
            tipo: dadosHabilidades.habilidade.tipo === TipoHabilidade.SOFT
                  ? 'soft'
                  : 'hard' 
          });
          break;

        case 'dados':
          const dadosAboutMe = dados as AboutDataShared;
          this.editForm.patchValue({
            campoTexto: dadosAboutMe.dado
          });
          break;
      
        default:
          throw new Error("Não foi possível listar os dados");
      }
    })
  }

  abrirModal(adicionar?: boolean){
    this.mostraFeedback = false;
    if(adicionar){
      this.adicionaHabilidade.set(true);
    }
    this.adicionaHabilidade.set(false);
    this.modal()?.nativeElement.showModal();
  }

  fecharModal(){
    this.modal()?.nativeElement.close();
    this.adicionaHabilidade.set(false);
    this.mostraFeedback = false;
  }

  enviarDados(){
    if(this.grupoCard() === 'habilidade'){
      const dadoAntigo = this.dadoRecebido() as ArrayHabilitiesModel;
      const dadosAtualizados: ArrayHabilitiesModel = {
        id: dadoAntigo?.id,
        habilidade: {
          habilidade: this.editForm.get('campoTexto')?.value,
          tipo: this.editForm.get('tipo')?.value === 'soft'
                  ? TipoHabilidade.SOFT
                  : TipoHabilidade.HARD 
        }
      }
      this.aguardarFeedback(FormFeedbackOutput.SUCCESS, 'Habilidade Atualizada com Sucesso!');
      this.habilitiesDataService.updateHabilities(dadosAtualizados);
    } else {
        const dadoAntigo = this.dadoRecebido() as AboutDataShared;
        const dadosAtualizados: AboutDataShared = {
          id: dadoAntigo.id,
          dado: this.editForm.get('campoTexto')?.value,
          campo: dadoAntigo.campo
        }
        this.aguardarFeedback(FormFeedbackOutput.SUCCESS, 'Dado Atualizado com Sucesso!');
        this.aboutMeDataService.updateDescriptionData(dadosAtualizados);
    }
  }


  adicionarHabilidade(){
    const novaHabilidade: HabilitiesModel = {
      habilidade: this.editForm.get('campoTexto')?.value,
      tipo: this.editForm.get('tipo')?.value === 'soft'
                                          ? TipoHabilidade.SOFT
                                          : TipoHabilidade.HARD
    }
    this.habilitiesDataService.postHabilities(novaHabilidade);

    this.aguardarFeedback(FormFeedbackOutput.SUCCESS, 'Habilidade Adicionada com Sucesso!');
  }

  removerHabilidade(){
    const hability = this.dadoRecebido() as ArrayHabilitiesModel;
    this.habilitiesDataService.deleteHabilityById(hability);
    this.aguardarFeedback(FormFeedbackOutput.SUCCESS, 'Habilidade Deletada com Sucesso!')
  }

  removerDados(){
    const data = this.dadoRecebido() as AboutDataShared;
    this.aboutMeDataService.deleteDescriptionContent(data.id, data.campo);
    this.aguardarFeedback(FormFeedbackOutput.SUCCESS, 'Dado resetado com Sucesso!');
  }

  async aguardarFeedback(status: FormFeedbackOutput, mensagem?: string){
    this.mostraFeedback = true;
    await this.renderizaFeedbackService.gerarModalFeedback(status, mensagem);

    this.mostraFeedback = false;
    this.fecharModal();
  }

}
