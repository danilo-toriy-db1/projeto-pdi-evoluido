import { Component, signal } from '@angular/core';
import { PaginaAtualState } from '../../services/pagina-atual-state';


@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.scss',
  standalone: false
})
export class LandingPage {
  paginaAtual = signal<string>('home');

  constructor(private paginaAtualState: PaginaAtualState) {
    this.paginaAtual = this.paginaAtualState.paginaAtual;
  }
}
