import { Component, input, output } from '@angular/core';
import { DadosMock } from '../../services/dados-mock';
import { HeaderAnchorsModel } from '../../models/header-anchors.model';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {

  paginaSelecionada = output<string>();
  admin = input<boolean>(false);
  dadosHeader: HeaderAnchorsModel[];

  constructor(private dados: DadosMock){
    this.dadosHeader = this.dados.headerAnchorContent.filter((dado) => {
        return (!dado.admin || dado.admin === null);
    })
  }


  trocarPagina(pagina: string){
    console.log(pagina);
    this.paginaSelecionada.emit(pagina);
  }
}
