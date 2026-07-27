import { Component, effect, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Footer } from "./shared/footer/footer";
import { Header } from "./shared/header/header";
import { PaginaAtualState } from './services/troca-pagina';
import { MudaTema } from './services/muda-tema/muda-tema';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Footer, Header],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  host: {
    '[class.dark-mode]': 'mudaTema.darkMode()'
  }
})
export class App {
  private router = inject(Router);

  protected readonly title = signal('projeto-angular-pdi');
  isLoginPage = signal<boolean>(false);


  constructor(private readonly paginaAtualState: PaginaAtualState,
              public mudaTema: MudaTema
  ) {
    this.router.events.subscribe((evento) => {
      if(evento instanceof NavigationEnd){
        if(this.router.url === '/login'){
          this.isLoginPage.set(true);
          return;
        }
        this.isLoginPage.set(false);
      }
    })
  }

  trocaPagina(pagina: string){
    this.paginaAtualState.trocaPagina(pagina);
  }


}
