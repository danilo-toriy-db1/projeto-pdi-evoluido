import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './template/header/header';
import { Footer } from './template/footer/footer';
import { InitialPage } from './pages/initial-page/initial-page';
import { AboutMePage } from "./pages/about-me-page/about-me-page";
import { HabilitiesPage } from "./pages/habilities-page/habilities-page";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, InitialPage, AboutMePage, HabilitiesPage],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('projeto-angular-pdi');

  paginaAtual = signal('home');

  trocaPagina(pagina: string){
    this.paginaAtual.set(pagina);
  }
}
