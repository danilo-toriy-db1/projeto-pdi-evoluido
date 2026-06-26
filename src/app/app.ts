import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from "./template/footer/footer";
import { Header } from "./template/header/header";
import { PaginaAtualState } from './services/pagina-atual-state';

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
