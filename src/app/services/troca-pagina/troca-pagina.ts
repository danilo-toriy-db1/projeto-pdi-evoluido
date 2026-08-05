import { Injectable, signal } from '@angular/core';

@Injectable({ 
  providedIn: 'root' 
})
export class PaginaAtualState {
  public readonly paginaAtual = signal('home');

  trocaPagina(pagina: string): void {
    this.paginaAtual.set(pagina);
  }
}