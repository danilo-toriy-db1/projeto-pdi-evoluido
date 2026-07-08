import { Component, effect, ElementRef, input, OnInit, viewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ArrayHabilitiesModel } from '../../models/array-habilities.model';
import { HabilitiesDataService } from '../../services/habilities-data.service';

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
  dadoRecebido = input<ArrayHabilitiesModel | string | null>();
  private modal = viewChild<ElementRef<HTMLDialogElement>>('editModal');

  constructor(private fb: FormBuilder,
              private habilitiesDataService: HabilitiesDataService
  ){
    effect(() => {
      const dados = this.dadoRecebido();

      if (dados) {
        if (this.grupoCard() === 'habilidade'){
          this.editForm.patchValue({
            campoTexto : typeof dados === 'string' ? dados : dados.habilidade.habilidade
          });
        } else{
          this.editForm.patchValue({
            campoTexto: typeof dados === 'string' ? dados : dados.habilidade.habilidade
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
    console.log(this.dadoRecebido());
    const dadoAntigo = this.dadoRecebido() as ArrayHabilitiesModel;
    if(this.grupoCard() === 'habilidade'){
      const dadosAtualizados: ArrayHabilitiesModel = {
        id: dadoAntigo?.id,
        habilidade: {
          ...dadoAntigo?.habilidade,
          habilidade: this.editForm.get('campoTexto')?.value
        }
      }
      this.habilitiesDataService.updateHabilities(dadosAtualizados);
    }
    this.fecharModal();
  }
}
