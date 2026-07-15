import { Component, signal, viewChild } from '@angular/core';
import { ArrayHabilitiesModel } from '../../../models/array-habilities.model';
import { EditModal } from '../../../shared/edit-modal/edit-modal';
import { HabilitiesDataService } from '../../../services/habilities-data.service/habilities-data.service';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.html',
  styleUrl: './edit-page.scss',
  standalone: false
})
export class EditPage {
    cardData = signal<ArrayHabilitiesModel | null>(null);
    modalRef = viewChild(EditModal);
  
    constructor(public habilitiesDataService: HabilitiesDataService){}

    abrirModal(habilities: ArrayHabilitiesModel){
      this.cardData.set(habilities);
      this.modalRef()?.abrirModal();
    }

    abrirModalAdicionar(){
      this.cardData.set(null);
      this.modalRef()?.abrirModalAdicionar();
    }
}
