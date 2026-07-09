import { Component, effect, ElementRef, input, OnInit, viewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ArrayHabilitiesModel } from '../../models/array-habilities.model';
import { HabilitiesDataService } from '../../services/habilities-data.service';
import { AboutMeDataService } from '../../services/about-me-data-service';
import { AboutModel } from '../../models/about.model';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.html',
  styleUrl: './edit-modal.scss',
  standalone: true,
    imports: [ReactiveFormsModule]
})
export class EditModal implements OnInit{

  editForm!: FormGroup;
  grupoCard = input<'habilidade' | 'dados'>();
  dadoRecebido = input<ArrayHabilitiesModel | AboutModel | string | null>();
  private modal = viewChild<ElementRef<HTMLDialogElement>>('editModal');

  constructor(private fb: FormBuilder,
              private habilitiesDataService: HabilitiesDataService,
              private aboutMeDataService: AboutMeDataService
  ){
    effect(() => {
      const dados = this.dadoRecebido();

      if (dados) {
        if (this.grupoCard() === 'habilidade'){
          const dadosHabilidades = dados as ArrayHabilitiesModel;
          this.editForm.patchValue({
            campoTexto : dadosHabilidades.habilidade.habilidade
          });

        } else{
          const dadosAboutMe = dados as AboutModel;
          this.editForm.patchValue({
            campoTexto: dadosAboutMe
          })
        }
      } else {
        this.editForm.reset();
      }
    })
  }

  ngOnInit(){
    this.editForm = this.fb.group({
      campoTexto: ['']
    });
  }

  abrirModal(){
    this.modal()?.nativeElement.showModal();
  }

  fecharModal(){
    this.modal()?.nativeElement.close();
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
    } else {
        const dadoAntigo = this.dadoRecebido() as AboutModel;
    }
    this.fecharModal();
  }
}
