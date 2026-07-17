import { Component, effect, input, signal, viewChild } from '@angular/core';
import { DadosMock } from '../../services/dados-mock/dados-mock';
import { AboutModel } from '../../models/about.model';
import { EditModal } from '../edit-modal/edit-modal';
import { ArrayHabilitiesModel } from '../../models/array-habilities.model';
import { AboutDataShared } from '../../models/about-data-shared.model';
import { ArrayAboutModel } from '../../models/array-about.model';
import { AboutMeDataService } from '../../services/about-me-data-service/about-me-data-service';


@Component({
  selector: 'app-card-about-me',
  templateUrl: './card-about-me.html',
  styleUrl: './card-about-me.scss',
  standalone: true,
  imports: [EditModal],
})
export class CardAboutMe{

  modoEdicao = input<boolean>(false);
  modalRef = viewChild(EditModal);
  dadosAboutMe = signal<ArrayAboutModel[]>([]);
  cardSelecionado = signal<AboutDataShared>({id: -1, dado: '', campo: ''});

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

}
