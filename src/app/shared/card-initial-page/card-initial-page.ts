import { Component, computed, input, ViewEncapsulation } from '@angular/core';
import { DadosMock } from '../../services/dados-mock';

@Component({
  selector: 'app-card-initial-page',
  templateUrl: './card-initial-page.html',
  styleUrl: './card-initial-page.scss',
  encapsulation: ViewEncapsulation.None,
  standalone: true,
})
export class CardInitialPage {

  admin = input<boolean>(false);
  cards = computed(() => { 
        return this.admin() 
                  ? this.dados.initialPageCard.filter((card) => card.admin || card.admin === null)
                  : this.dados.initialPageCard.filter((card) => !card.admin || card.admin === null);
  });

  constructor(private dados: DadosMock){
  }
}
