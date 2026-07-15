import { Component, OnInit } from '@angular/core';
import { contactPageModel } from '../../../models/contact-page.model';
import { DadosMock } from '../../../services/dados-mock/dados-mock';
import { TipoContactPage } from '../../../models/enums/tipo-contact-page';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.html',
  styleUrl: './contact-page.scss',
  standalone: false
})
export class ContactPage implements OnInit{

  dadosContact: contactPageModel[];
  tecnologia: contactPageModel[] = [];
  versionamento: contactPageModel[] = [];
  gestao: contactPageModel[] = [];
  contato: contactPageModel[] = [];



  constructor(private dados: DadosMock){
    this.dadosContact = this.dados.contactPage;
  }

  ngOnInit(){
    const dadosFormatados = Object.groupBy(this.dadosContact, (item) => item.type);

    this.tecnologia = dadosFormatados[TipoContactPage.TECNOLOGIA] ?? [];
    this.versionamento = dadosFormatados[TipoContactPage.VERSIONAMENTO] ?? [];
    this.gestao = dadosFormatados[TipoContactPage.GESTAO] ?? [];
    this.contato = dadosFormatados[TipoContactPage.CONTATO] ?? [];

  }

}
