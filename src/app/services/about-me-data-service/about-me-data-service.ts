import { Injectable, signal } from '@angular/core';
import { AboutModel } from '../../models/about.model';
import { DadosMock } from '../dados-mock/dados-mock';
import { LocalStorageService } from '../local-storage.service/local-storage.service';
import { ArrayAboutModel } from '../../models/array-about.model';
import { AboutDataShared } from '../../models/about-data-shared.model';

@Injectable({
  providedIn: 'root',
})
export class AboutMeDataService {
  
  dadosAboutMe = signal<ArrayAboutModel[] | null>(null);


  constructor(private localStorageService: LocalStorageService,
              private dados: DadosMock
  ){
      const dadosLocal = this.localStorageService.get('personalData');
      if(dadosLocal && dadosLocal.length > 0 ){
        this.dadosAboutMe.set(dadosLocal);
      }else{
        this.dadosAboutMe.set(this.dados.about);
        this.localStorageService.post('personalData', this.dados.about)
      }
  }

  updateDescriptionData(dado: AboutDataShared){
    console.log(dado);
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
    console.log(this.dadosAboutMe());
    this.localStorageService.post('personalData', this.dadosAboutMe());
  }

  // updateAboutData(dado: AboutDataShared){
  //   const dadosAboutMe = this.dadosAboutMe();
  //   console.log(dadosAboutMe);

  //   const dataUpdated = dadosAboutMe?.map(() => {

  //   })

  // //   this.localStorageService.post('habilities', dataUpdated);
  // //   this.dadosAboutMe.set(dataUpdated);
  //  }
}
