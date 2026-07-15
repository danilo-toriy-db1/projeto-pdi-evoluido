import { Component, input, signal, viewChild } from '@angular/core';
import { DadosMock } from '../../services/dados-mock/dados-mock';
import { AboutModel } from '../../models/about.model';
import { EditModal } from '../edit-modal/edit-modal';
import { ArrayHabilitiesModel } from '../../models/array-habilities.model';


@Component({
  selector: 'app-card-about-me',
  templateUrl: './card-about-me.html',
  styleUrl: './card-about-me.scss',
  standalone: true,
  imports: [EditModal],
})
export class CardAboutMe {

  modoEdicao = input<boolean>(false);
  dadosAboutMe: AboutModel;
  modalRef = viewChild(EditModal);
  cardSelecionado = signal<ArrayHabilitiesModel | AboutModel | string | null>(null);

  constructor(private dados: DadosMock) {
    this.dadosAboutMe = this.dados.about;
  }

  abrirModal(dadoCapturado: string){
    if(!this.modoEdicao()){
      return;
    }
    this.cardSelecionado.set(dadoCapturado);
    this.modalRef()?.abrirModal();
  }

}
