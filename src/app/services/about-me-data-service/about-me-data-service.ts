import { Injectable, signal } from '@angular/core';
import { DadosMock } from '../dados-mock/dados-mock';
import { LocalStorageService } from '../local-storage.service/local-storage.service';
import { ArrayAboutModel } from '../../models/array-about.model';
import { AboutDataShared } from '../../models/about-data-shared.model';
import { AboutPersonalDataShared } from '../../models/about-personal-data-shared';

@Injectable({
  providedIn: 'root',
})
export class AboutMeDataService {
  
  dadosAboutMe = signal<ArrayAboutModel[] | null>(null);


  constructor(private localStorageService: LocalStorageService,
              private dados: DadosMock
  ){
      const dadosLocal = this.localStorageService.get<ArrayAboutModel[]>('personalData');
      if(dadosLocal && dadosLocal.length > 0 ){
        this.dadosAboutMe.set(dadosLocal);
      }else{
        this.dadosAboutMe.set(this.dados.about);
        this.localStorageService.post<ArrayAboutModel[]>('personalData', this.dados.about)
      }
  }

  updateDescriptionData(dado: AboutDataShared){
    this.dadosAboutMe.update((dadosAtuais) => {
      if(!dadosAtuais){
        return null;
      }

      return dadosAtuais.map( (item) => {
        if (item.id !== dado.id) {
          return item;
        }

        return {
          ...item,
          dados: {
            ...item.dados,
            descricao: 
              {
                ...item.dados.descricao,
                [dado.campo]: dado.dado
              }
          }
        };
      });
    });

    this.localStorageService.post<ArrayAboutModel[]>('personalData',this.dadosAboutMe()!);
  }

  deleteDescriptionContent(id: number, campo: string){
    this.dadosAboutMe.update((dadosAtuais) => {
      if(!dadosAtuais){
        return null;
      }
      
      return dadosAtuais.map( (item) => {
        if (item.id !== id) {
          return item;
        }

        return {
          ...item,
          dados: {
            ...item.dados,
            descricao: 
              {
                ...item.dados.descricao,
                [campo]: 'Sem Informações'
              }
          }
        };
      });
    });

    this.localStorageService.post<ArrayAboutModel[]>('personalData', this.dadosAboutMe()!);
  }

  updatePersonalData(dado: AboutPersonalDataShared){
    this.dadosAboutMe.update((dadosAtuais) => {
      if(!dadosAtuais){
        return null;
      }

      return dadosAtuais.map( (item) => {
        if (item.id !== dado.id) {
          return item;
        }

        return {
          ...item,
          dados: {
            nome: dado.nome,
            idade: dado.idade,
            carreira: dado.carreira,
            profissao: dado.profissao,
            empresa: dado.empresa,
            descricao: 
              {
                ...item.dados.descricao
              }
          }
        };
      });
    });

    this.localStorageService.post<ArrayAboutModel[]>('personalData', this.dadosAboutMe()!);
  }

}
