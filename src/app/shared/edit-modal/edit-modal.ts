import { Component, effect, ElementRef, input, OnInit, signal, viewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ArrayHabilitiesModel } from '../../models/array-habilities.model';
import { HabilitiesDataService } from '../../services/habilities-data.service/habilities-data.service';
import { AboutMeDataService } from '../../services/about-me-data-service/about-me-data-service';
import { HabilitiesModel } from '../../models/habilities.model';
import { TipoHabilidade } from '../../models/enums/tipo-habilidade';
import { AboutDataShared } from '../../models/about-data-shared.model';
import { FormFeedbackOutput } from '../../models/enums/form-feedback-output';
import { VisualFeedbackModal } from "../visual-feedback-modal/visual-feedback-modal/visual-feedback-modal";

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.html',
  styleUrl: './edit-modal.scss',
  standalone: true,
    imports: [ReactiveFormsModule, VisualFeedbackModal]
})
export class EditModal{

  editForm!: FormGroup;
  grupoCard = input<'habilidade' | 'dados'>();
  dadoRecebido = input<ArrayHabilitiesModel | AboutDataShared | null>();
  adicionaHabilidade = signal<boolean>(false);
  private modal = viewChild<ElementRef<HTMLDialogElement>>('editModal');
  mostraFeedback = false;
  statusModal = signal<string>('');
  mensagemFeedback = signal<string>('');

  constructor(private fb: FormBuilder,
              private habilitiesDataService: HabilitiesDataService,
              private aboutMeDataService: AboutMeDataService
  ){
    this.editForm = this.fb.group({
      campoTexto: ['']
    });

    effect(() => {
      const dados = this.dadoRecebido();

      if(!dados && !this.adicionaHabilidade()){
        this.editForm.reset();
        return;
      }

      switch (this.grupoCard()) {
        case 'habilidade':
          if(this.adicionaHabilidade()){
            this.configModalAdicionar();
            return;
          }

          const dadosHabilidades = dados as ArrayHabilitiesModel;
          this.editForm.patchValue({
            campoTexto : dadosHabilidades.habilidade.habilidade
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

  abrirModal(){
    this.statusModal.set('');
    this.mostraFeedback = false;
    this.modal()?.nativeElement.showModal();
  }

  abrirModalAdicionar(){
    this.adicionaHabilidade.set(true);
    this.statusModal.set('');
    this.mostraFeedback = false;
    this.modal()?.nativeElement.showModal();
  }

  fecharModal(){
    this.modal()?.nativeElement.close();
    this.adicionaHabilidade.set(false);
    this.mostraFeedback = false;
    this.statusModal.set('');
    if(this.editForm.contains('tipo')){
      this.editForm.removeControl('tipo');
    }
  }

  enviarDados(){
    if(this.grupoCard() === 'habilidade'){
      const dadoAntigo = this.dadoRecebido() as ArrayHabilitiesModel;
      const dadosAtualizados: ArrayHabilitiesModel = {
        id: dadoAntigo?.id,
        habilidade: {
          ...dadoAntigo?.habilidade,
          habilidade: this.editForm.get('campoTexto')?.value
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

  configModalAdicionar(){
    this.editForm.reset();
    this.editForm.addControl('tipo', this.fb.control(''));
    this.abrirModalAdicionar();
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
