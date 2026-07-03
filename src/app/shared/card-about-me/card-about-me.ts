import { Component, input } from '@angular/core';
import { DadosMock } from '../../services/dados-mock';
import { AboutModel } from '../../models/about.model';

@Component({
  selector: 'app-card-about-me',
  templateUrl: './card-about-me.html',
  styleUrl: './card-about-me.scss',
  standalone: true
})
export class CardAboutMe {

  modoEdicao = input<boolean>(false);
  dadosAboutMe: AboutModel;

  constructor(private dados: DadosMock) {
    this.dadosAboutMe = this.dados.about;
  }

}
