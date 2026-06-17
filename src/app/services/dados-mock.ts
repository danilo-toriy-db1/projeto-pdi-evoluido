import { Injectable } from '@angular/core';
import type { AboutModel } from '.././models/about.model.js'
import type { InitialPageCardsModel } from '.././models/initial-page-cards.model.js';
import { ArrayHabilitiesModel } from '../models/array-habilities.model.js';
import { TipoHabilidade } from '../models/enums/tipo-habilidade.js';


@Injectable({
  providedIn: 'root',
})
export class DadosMock {
  about: AboutModel = {
    nome: "Danilo Riki Toriy",
    idade: 19,
    carreira: "Estudante de Engenharia de Software",
    profissao: "Estagiário de Desenvolvimento de Software",
    empresa: "DB1 Global Software",
    descricao: {
        biografia: "bla bla bla",
        hobbies: "bla bla bla",
        desgostos: "bla bla bla",
        objetivos: "bla bla bla"
    }
  }

  initialPageCard: InitialPageCardsModel[] = [
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

  habilities: ArrayHabilitiesModel[] = [
    { id: "h1",
      habilidade: {
        habilidade: "HTML",
        tipo: TipoHabilidade.HARD
      }
    },
    { id: "h2",
      habilidade: {
        habilidade: "CSS",
        tipo: TipoHabilidade.HARD
      }
    },
    { id: "h3",
      habilidade: {
        habilidade: "JavaScript",
        tipo: TipoHabilidade.HARD
      }
    },
    { id: "s1",
      habilidade: {
        habilidade: "Comunicação",
        tipo: TipoHabilidade.SOFT
      }
    },
    { id: "s2",
      habilidade: {
        habilidade: "Trabalho em equipe",
        tipo: TipoHabilidade.SOFT
      }
    }
  ] 
}
