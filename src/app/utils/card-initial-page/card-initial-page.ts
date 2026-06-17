import { Component, ViewEncapsulation } from '@angular/core';
import { InitialPageCardsModel } from '../../models/initial-page-cards.model';
import { DadosMock } from '../../services/dados-mock';

@Component({
  selector: 'app-card-initial-page',
  imports: [],
  templateUrl: './card-initial-page.html',
  styleUrl: './card-initial-page.scss',
  encapsulation: ViewEncapsulation.None
})
export class CardInitialPage {

  cards: InitialPageCardsModel[];

  constructor(private dados: DadosMock){
    this.cards = this.dados.initialPageCard;
  }
}
