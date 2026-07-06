import { Component, effect, ElementRef, input, OnInit, viewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HabilitiesModel } from '../../models/habilities.model';

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
  dadoRecebido = input<HabilitiesModel | string| null>();
  private modal = viewChild<ElementRef<HTMLDialogElement>>('editModal');

  constructor(private fb: FormBuilder){
    effect(() => {
      const dados = this.dadoRecebido();

      if (dados) {
        if (this.grupoCard() === 'habilidade'){
          this.editForm.patchValue({
            campoTexto : typeof dados === 'string' ? dados : dados.habilidade
          });
        } else{
          this.editForm.patchValue({
            campoTexto: typeof dados === 'string' ? dados : dados.habilidade
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
}
