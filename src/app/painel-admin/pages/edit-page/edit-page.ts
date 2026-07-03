import { Component } from '@angular/core';
import { ArrayHabilitiesModel } from '../../../models/array-habilities.model';
import { DadosMock } from '../../../services/dados-mock';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.html',
  styleUrl: './edit-page.scss',
  standalone: false
})
export class EditPage {
    cardsHabilities: ArrayHabilitiesModel[];
  
    constructor(private dados: DadosMock){
      this.cardsHabilities = this.dados.habilities;
    }
}
