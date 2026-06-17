import { Component } from '@angular/core';
import { ArrayHabilitiesModel } from '../../models/array-habilities.model';
import { DadosMock } from '../../services/dados-mock';
import { ButtonExcludeHability } from "../button-exclude-hability/button-exclude-hability";

@Component({
  selector: 'app-card-hability',
  imports: [ButtonExcludeHability],
  templateUrl: './card-hability.html',
  styleUrl: './card-hability.scss',
})
export class CardHability {

  cardsHabilities: ArrayHabilitiesModel[];

  constructor(private dados: DadosMock){
    this.cardsHabilities = this.dados.habilities;
  }
}
