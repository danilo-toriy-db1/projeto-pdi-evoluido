import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-card-initial-page',
  imports: [],
  templateUrl: './card-initial-page.html',
  styleUrl: './card-initial-page.scss',
  encapsulation: ViewEncapsulation.None
})
export class CardInitialPage {

  cards = [
    {
      id: 'card-1',
      href: 'https://github.com/danilo-toriy-db1/projeto-pdi/tree/upstream',
      target: '_blank',
      content: `<img src="./assets/icons/github-icon.svg" id="card__item--github">
        <p class="card__item--text">
            Esse projeto foi desenvolvido usando HTML, CSS e JavaScript.
            Cada Commit e Pull Request foi registrado no Github pessoal
            do dev, no caso, do Danilo Toriy. O Repositório é público
            e pode ser acessado por qualquer um que tiver vontade de ver
            o processo de desenvolvimento do projeto.
        </p>`
    },
    {
      id: 'card-2',
      href: null,
      target: null,
      content: `<img src="./assets/icons/add-icon.svg" id="card__item--add">
          <p class="card__item--text">
              Caso deseje criar uma página de apresentação pessoal, o projeto
              foi desenvolvido de forma que possa ser replicado via código ou 
              por meio do preenchimento de informações.
          </p>`
    },
    {
      id: 'card-3',
      href: null,
      target: null,
      content: `<img src="./assets/icons/change-icon.svg" id="card__item--mode">
          <p class="card__item--text">
              O Projeto foi desenvolvido para ser responsivo, ou seja, se adaptando
              a diferentes tipos de telas. Além disso, ela possui troca entre modo
              escuro e claro, bastando clicar aqui ou clicar no ícone no cabeçalho 
              para alternar o modo de exibição.
          </p>`
    }
  ]
}
