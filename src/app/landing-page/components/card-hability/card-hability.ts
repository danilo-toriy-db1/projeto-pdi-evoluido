import { Component, effect, signal } from '@angular/core';
import { ArrayHabilitiesModel } from '../../../models/array-habilities.model';
import { DadosMock } from '../../../services/dados-mock/dados-mock';
import { HabilitiesDataService } from '../../../services/habilities-data.service/habilities-data.service';

@Component({
  selector: 'app-card-hability',
  templateUrl: './card-hability.html',
  styleUrl: './card-hability.scss',
  standalone: false
})
export class CardHability {

  cardsHabilities = signal<ArrayHabilitiesModel[]>([]);

  constructor(private habilitiesDataService: HabilitiesDataService){
    effect(() => {
      const dados = this.habilitiesDataService.habilities();

      if(!dados){
        return;
      }

      this.cardsHabilities.set(dados);
    })
  }
}
