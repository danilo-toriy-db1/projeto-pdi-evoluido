import { Component } from '@angular/core';
import { ArrayHabilitiesModel } from '../../../models/array-habilities.model';
import { DadosMock } from '../../../services/dados-mock/dados-mock';

@Component({
  selector: 'app-card-hability',
  templateUrl: './card-hability.html',
  styleUrl: './card-hability.scss',
  standalone: false
})
export class CardHability {

  cardsHabilities: ArrayHabilitiesModel[];

  constructor(private dados: DadosMock){
    this.cardsHabilities = this.dados.habilities;
  }
}
