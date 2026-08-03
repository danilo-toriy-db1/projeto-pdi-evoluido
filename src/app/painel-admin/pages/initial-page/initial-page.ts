import { Component } from '@angular/core';
import { PaginaAtualState } from '../../../services/troca-pagina';

@Component({
  selector: 'app-initial-page',
  templateUrl: './initial-page.html',
  styleUrl: './initial-page.scss',
  standalone: false
})
export class InitialPage {

  constructor(private paginaAtualState: PaginaAtualState){
  }

  mudarPagina(card: EventTarget | null){
    if(!card){
      return;
    }
    const elemento = card as HTMLElement;
    if (elemento.id !== 'card-5'){
      return;
    }

    this.paginaAtualState.trocaPagina('dataEdit');
  }
}
