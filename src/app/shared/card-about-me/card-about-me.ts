import { Component, effect, input, signal, viewChild } from '@angular/core';
import { DadosMock } from '../../services/dados-mock/dados-mock';
import { AboutModel } from '../../models/about.model';
import { EditModal } from '../edit-modal/edit-modal';
import { ArrayHabilitiesModel } from '../../models/array-habilities.model';
import { AboutDataShared } from '../../models/about-data-shared.model';
import { ArrayAboutModel } from '../../models/array-about.model';
import { AboutMeDataService } from '../../services/about-me-data-service/about-me-data-service';
import { DataModal } from '../data-modal/data-modal';
import { AboutPersonalDataShared } from '../../models/about-personal-data-shared';


@Component({
  selector: 'app-card-about-me',
  templateUrl: './card-about-me.html',
  styleUrl: './card-about-me.scss',
  standalone: true,
  imports: [EditModal, DataModal],
})
export class CardAboutMe{

  modoEdicao = input<boolean>(false);
  modalRef = viewChild(EditModal);
  modalPessoalRef = viewChild(DataModal);
  dadosAboutMe = signal<ArrayAboutModel[]>([]);
  cardSelecionado = signal<AboutDataShared | null>(null);
  pessoaSelecionada = signal<AboutPersonalDataShared | null>(null)

  constructor(public aboutMeDataService: AboutMeDataService) {
    effect(() => {
      const dados = aboutMeDataService.dadosAboutMe();

      if(!dados){
        return;
      }

      this.dadosAboutMe.set(dados);
    })
  }

  abrirModal(id: number, dadoCapturado: string, campo: string){
    if(!this.modoEdicao()){
      return;
    }
    const dados: AboutDataShared = {
      id: id,
      dado: dadoCapturado,
      campo: campo
    }
    this.cardSelecionado.set(dados);
    this.modalRef()?.abrirModal();
  }

  abrirModalDadosPessoais(id: number, pessoa: AboutModel){
    if(!this.modoEdicao()){
      return;
    }
    const dados: AboutPersonalDataShared = {
      id: id,
      nome: pessoa.nome,
      idade: pessoa.idade,
      carreira: pessoa.carreira,
      profissao: pessoa.profissao,
      empresa: pessoa.empresa
    }
    this.pessoaSelecionada.set(dados);
    this.modalPessoalRef()?.abrirModal();
  }

}
