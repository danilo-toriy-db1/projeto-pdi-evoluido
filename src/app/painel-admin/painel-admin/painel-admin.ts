import { Component, signal } from '@angular/core';
import { PaginaAtualState } from '../../services/troca-pagina/troca-pagina';
import { PagesNames } from '../../models/enums/pages-names';

@Component({
  selector: 'app-painel-admin',
  templateUrl: './painel-admin.html',
  styleUrl: './painel-admin.scss',
  standalone: false
})
export class PainelAdmin {
  PagesNames = PagesNames;
  paginaAtual = signal<string>(PagesNames.INITIAL_PAGE);

  constructor(private paginaAtualState: PaginaAtualState) {
    this.paginaAtual = this.paginaAtualState.paginaAtual;
  }
}
