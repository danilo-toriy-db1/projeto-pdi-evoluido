import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from "./shared/footer/footer";
import { Header } from "./shared/header/header";
import { PaginaAtualState } from './services/troca-pagina';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Footer, Header],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('projeto-angular-pdi');

  constructor(private readonly paginaAtualState: PaginaAtualState) {}

  trocaPagina(pagina: string){
    this.paginaAtualState.trocaPagina(pagina);
  }
}
