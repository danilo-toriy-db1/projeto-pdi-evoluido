import { Component, signal, viewChild } from '@angular/core';
import { ArrayHabilitiesModel } from '../../../models/array-habilities.model';
import { DadosMock } from '../../../services/dados-mock';
import { HabilitiesModel } from '../../../models/habilities.model';
import { EditModal } from '../../../shared/edit-modal/edit-modal';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.html',
  styleUrl: './edit-page.scss',
  standalone: false
})
export class EditPage {
    cardsHabilities: ArrayHabilitiesModel[];
    cardData = signal<HabilitiesModel | null>(null);
    modalRef = viewChild(EditModal);
  
    constructor(private dados: DadosMock){
      this.cardsHabilities = this.dados.habilities;
    }

    abrirModal(habilities: HabilitiesModel){
      this.cardData.set(habilities);
      this.modalRef()?.abrirModal();
    }
}
