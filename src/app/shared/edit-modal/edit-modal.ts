import { Component, effect, ElementRef, input, OnInit, signal, viewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ArrayHabilitiesModel } from '../../models/array-habilities.model';
import { HabilitiesDataService } from '../../services/habilities-data.service/habilities-data.service';
import { AboutMeDataService } from '../../services/about-me-data-service/about-me-data-service';
import { HabilitiesModel } from '../../models/habilities.model';
import { TipoHabilidade } from '../../models/enums/tipo-habilidade';
import { AboutDataShared } from '../../models/about-data-shared.model';
import { AboutPersonalDataShared } from '../../models/about-personal-data-shared';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.html',
  styleUrl: './edit-modal.scss',
  standalone: true,
    imports: [ReactiveFormsModule]
})
export class EditModal{

  editForm!: FormGroup;
  grupoCard = input<'habilidade' | 'dados'>();
  dadoRecebido = input<ArrayHabilitiesModel | AboutDataShared | null>();
  adicionaHabilidade = signal<boolean>(false);
  private modal = viewChild<ElementRef<HTMLDialogElement>>('editModal');

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
    this.modal()?.nativeElement.showModal();
  }

  abrirModalAdicionar(){
    this.adicionaHabilidade.set(true)
    this.modal()?.nativeElement.showModal();
  }

  fecharModal(){
    this.modal()?.nativeElement.close();
    this.adicionaHabilidade.set(false);
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
      this.habilitiesDataService.updateHabilities(dadosAtualizados);
      console.log(dadoAntigo);
    } else {
        const dadoAntigo = this.dadoRecebido() as AboutDataShared;
        const dadosAtualizados: AboutDataShared = {
          id: dadoAntigo.id,
          dado: this.editForm.get('campoTexto')?.value,
          campo: dadoAntigo.campo
        }
        this.aboutMeDataService.updateDescriptionData(dadosAtualizados);
    }
    this.fecharModal();
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

    this.fecharModal();
  }

  removerHabilidade(){
    const hability = this.dadoRecebido() as ArrayHabilitiesModel;
    this.habilitiesDataService.deleteHabilityById(hability);
    this.fecharModal();
  }

  removerDados(){
    const data = this.dadoRecebido() as AboutDataShared;
    this.aboutMeDataService.deleteDescriptionContent(data.id, data.campo);
    this.fecharModal();
  }
}
