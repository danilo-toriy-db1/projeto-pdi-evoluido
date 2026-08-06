import { Component, signal } from '@angular/core';
import { PaginaAtualState } from '../../services/troca-pagina/troca-pagina';
import { PagesNames } from '../../models/enums/pages-names';


@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.scss',
  standalone: false
})
export class LandingPage {
  PagesNames = PagesNames;
  paginaAtual = signal<string>(PagesNames.INITIAL_PAGE);

  constructor(private paginaAtualState: PaginaAtualState) {
    this.paginaAtual = this.paginaAtualState.paginaAtual;
  }
}
