import { inject, Injectable } from '@angular/core';
import type { AboutModel } from '../../models/about.model.js'
import type { InitialPageCardsModel } from '../../models/initial-page-cards.model.js';
import { ArrayHabilitiesModel } from '../../models/array-habilities.model.js';
import { TipoHabilidade } from '../../models/enums/tipo-habilidade.js';
import { contactPageModel } from '../../models/contact-page.model.js';
import { TipoContactPage } from '../../models/enums/tipo-contact-page.js';
import { HeaderAnchorsModel } from '../../models/header-anchors.model.js';
import { LocalStorageService } from '../local-storage.service/local-storage.service.js';
import { Users } from '../../models/users.js';
import { Roles } from '../../models/enums/roles.js';


@Injectable({
  providedIn: 'root',
})
export class DadosMock {

  localStorageService = inject(LocalStorageService);

  headerAnchorContent: HeaderAnchorsModel[] = [
    {
      id: "initial__page",
      name: "home",
      content: "Página Inicial",
      active: true,
      admin: null
    },
    {
      id: "about__me",
      name: "about",
      content: "Sobre Mim",
      active: false,
      admin: false
    },
    {
      id: "habilities",
      name: "habilities",
      content: "Habilidades",
      active: false,
      admin: false
    },
    {
      id: "contact__page",
      name: "contact",
      content: "Contato e Sobre",
      active: false,
      admin: false
    },
    {
      id: "dataEdit__page",
      name: "dataEdit",
      content: "Editar Dados",
      active: false,
      admin: true
    },
    {
      id: "usersEdit__page",
      name: "usersEdit",
      content: "Editar Usuários",
      active: false,
      admin: true
    }
  ]

  about: AboutModel = {
    id: 1,
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
      content: `<img src="assets/icons/github-icon.svg" id="card__item--github">
        <p class="card__item--text">
            Esse projeto foi desenvolvido usando HTML, CSS e JavaScript.
            Cada Commit e Pull Request foi registrado no Github pessoal
            do dev, no caso, do Danilo Toriy. O Repositório é público
            e pode ser acessado por qualquer um que tiver vontade de ver
            o processo de desenvolvimento do projeto.
        </p>`,
        admin: false
    },
    {
      id: 'card-2',
      href: null,
      target: null,
      content: `<img src="assets/icons/add-icon.svg" id="card__item--add">
          <p class="card__item--text">
              Caso deseje criar uma página de apresentação pessoal, o projeto
              foi desenvolvido de forma que possa ser replicado via código ou 
              por meio do preenchimento de informações.
          </p>`,
      admin: false
    },
    {
      id: 'card-3',
      href: null,
      target: null,
      content: `<img src="assets/icons/change-icon.svg" id="card__item--mode">
          <p class="card__item--text">
              O Projeto foi desenvolvido para ser responsivo, ou seja, se adaptando
              a diferentes tipos de telas. Além disso, ela possui troca entre modo
              escuro e claro, bastando clicar aqui ou clicar no ícone no cabeçalho 
              para alternar o modo de exibição.
          </p>`,
      admin: null
    },
    {
      id: 'card-4',
      href: '/landing-page',
      target: '_self',
      content: `<img src="assets/icons/change-icon.svg" id="card__item--mode">
          <p class="card__item--text">
              Deseja retornar para o Modo Visualização? Clique aqui para sair do
              Painel Administrativo.
          </p>`,
      admin: true
    },
    {
      id: 'card-5',
      href: null,
      target: null,
      content: `<img src="assets/icons/change-icon.svg" id="card__item--mode">
          <p class="card__item--text">
              Clique aqui para ir para a página de Edição dos dados. Lá você poderá
              olhar as informações pessoais e habilidades, editá-las e modificá-las.
          </p>`,
      admin: true
    }
  ]

  habilities: ArrayHabilitiesModel[] = [
    { id: 1,
      habilidade: {
        habilidade: "HTML",
        tipo: TipoHabilidade.HARD
      }
    },
    { id: 2,
      habilidade: {
        habilidade: "CSS",
        tipo: TipoHabilidade.HARD
      }
    },
    { id: 3,
      habilidade: {
        habilidade: "JavaScript",
        tipo: TipoHabilidade.HARD
      }
    },
    { id: 4,
      habilidade: {
        habilidade: "Comunicação",
        tipo: TipoHabilidade.SOFT
      }
    },
    { id: 5,
      habilidade: {
        habilidade: "Trabalho em equipe",
        tipo: TipoHabilidade.SOFT
      }
    }
  ]
  
  contactPage: contactPageModel[] = [
    {
      type: TipoContactPage.TECNOLOGIA,
      srcImg: "assets/icons/html-icon.svg",
      altImg: "Ícone do HTML",
      idImg: "html-icon",
      spanId: "html",
      spanContent: "HTML",
      text: null,
      anchor: null
    },
    {
      type: TipoContactPage.TECNOLOGIA,
      srcImg: "assets/icons/css-icon.svg",
      altImg: "Ícone do CSS",
      idImg: "css-icon",
      spanId: "css",
      spanContent: "CSS",
      text: null,
      anchor: null
    },
    {
      type: TipoContactPage.TECNOLOGIA,
      srcImg: "assets/icons/javascript-icon.svg",
      altImg: "Ícone do JavaScript",
      idImg: "javascript-icon",
      spanId: "js",
      spanContent: "JavaScript",
      text: null,
      anchor: null
    },
    {
      type: TipoContactPage.VERSIONAMENTO,
      srcImg: "assets/icons/git-icon.svg",
      altImg: "Ícone do Git",
      idImg: "git-icon",
      spanId: "git",
      spanContent: "Git",
      text: "Para versionamento de código",
      anchor: null
    },
    {
      type: TipoContactPage.VERSIONAMENTO,
      srcImg: "assets/icons/github-icon.svg",
      altImg: "Ícone do GitHub",
      idImg: "github-icon",
      spanId: "github",
      spanContent: "GitHub",
      text: "Como Repositório do Projeto",
      anchor: null
    },
    {
      type: TipoContactPage.GESTAO,
      srcImg: "assets/icons/azure-devops-icon.svg",
      altImg: "Ícone do Azure DevOps",
      idImg: "azure-devops-icon",
      spanId: "azure",
      spanContent: "Azure DevOps",
      text: "Para controle de requisitos com User Stories e apontamento de horas",
      anchor: null
    },
    {
      type: TipoContactPage.GESTAO,
      srcImg: "assets/icons/excalidraw-icon.svg",
      altImg: "Ícone do Excalidraw",
      idImg: "excalidraw-icon",
      spanId: "excalidraw",
      spanContent: "Excalidraw",
      text: "Para backlog e gestão de sprints de forma visual",
      anchor: null
    },
    {
      type: TipoContactPage.CONTATO,
      srcImg: "assets/icons/email-icon.svg",
      altImg: "Ícone de Email",
      idImg: "contact__email",
      spanId: null,
      spanContent: null,
      text: null,
      anchor: {
        id: "email",
        href: "mailto:danilo.toriy@db1.com.br",
        target: null,
        content: "Email"
      }
    },
    {
      type: TipoContactPage.CONTATO,
      srcImg: "assets/icons/github-icon.svg",
      altImg: "Ícone do Github",
      idImg: "contact__github",
      spanId: null,
      spanContent: null,
      text: null,
      anchor: {
        id: "github__contact",
        href: "https://github.com/danilo-toriy-db1",
        target: "_blank",
        content: "GitHub" 
      }
    }
  ]

  users: Users[] = [
    { user: 'admin',
      password: '123@',
      role: Roles.ADMIN
    },
    { user: 'user',
      password: '123U',
      role: Roles.USUARIO
    }
  ]

  constructor(){
    if(!this.localStorageService.get('habilities')){
      this.localStorageService.post('habilities', this.habilities);
    }
    if(!this.localStorageService.get('personalData')){
      this.localStorageService.post('personalData', this.about);
    }
    if(!this.localStorageService.get('users')){
      this.localStorageService.post('users', this.users);
      this.localStorageService.post('activeSession', false);
      this.localStorageService.post('activeUserRole', Roles.USUARIO);
    }
  }
}
