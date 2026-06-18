import { Component } from '@angular/core';
import { ArrayHabilitiesModel } from '../../models/array-habilities.model';
import { DadosMock } from '../../services/dados-mock';
import { ButtonExcludeHability } from "../button-exclude-hability/button-exclude-hability";
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-card-hability',
  imports: [ButtonExcludeHability, NgClass],
  templateUrl: './card-hability.html',
  styleUrl: './card-hability.scss',
})
export class CardHability {

  cardsHabilities: ArrayHabilitiesModel[];

  constructor(private dados: DadosMock){
    this.cardsHabilities = this.dados.habilities;
  }
}
