import { Component, computed, input, ViewEncapsulation } from '@angular/core';
import { DadosMock } from '../../services/dados-mock/dados-mock';
import { MudaTema } from '../../services/muda-tema/muda-tema';

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

  constructor(private dados: DadosMock,
              private mudaTema: MudaTema
  ){
  }

  alternarTema(id: string){
    if (id !== 'card-3') {
      return;
    }

    this.mudaTema.alternarTema();
  }
}
