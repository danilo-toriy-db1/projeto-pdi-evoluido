import { Component, signal } from '@angular/core';
import { PaginaAtualState } from '../../services/troca-pagina/troca-pagina';

@Component({
  selector: 'app-painel-admin',
  templateUrl: './painel-admin.html',
  styleUrl: './painel-admin.scss',
  standalone: false
})
export class PainelAdmin {
  paginaAtual = signal<string>('home');

  constructor(private paginaAtualState: PaginaAtualState) {
    this.paginaAtual = this.paginaAtualState.paginaAtual;
  }
}
