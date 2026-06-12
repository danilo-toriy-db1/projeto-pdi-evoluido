import { Component, output } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {

  paginaSelecionada = output<string>();

  trocarPagina(pagina: string){
    this.paginaSelecionada.emit(pagina);
  }
}
