import { Injectable, signal } from '@angular/core';
import { PagesNames } from '../../models/enums/pages-names';

@Injectable({ 
  providedIn: 'root' 
})
export class PaginaAtualState {
  public readonly paginaAtual = signal(PagesNames.INITIAL_PAGE);

  trocaPagina(pagina: PagesNames): void {
    this.paginaAtual.set(pagina);
  }
}