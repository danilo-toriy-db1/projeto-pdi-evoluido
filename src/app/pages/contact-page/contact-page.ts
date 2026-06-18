import { Component, OnInit } from '@angular/core';
import { contactPageModel } from '../../models/contact-page.model';
import { DadosMock } from '../../services/dados-mock';
import { TipoContactPage } from '../../models/enums/tipo-contact-page';
import { ContactSection } from "../../utils/contact-section/contact-section";

@Component({
  selector: 'app-contact-page',
  imports: [ContactSection],
  templateUrl: './contact-page.html',
  styleUrl: './contact-page.scss',
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
