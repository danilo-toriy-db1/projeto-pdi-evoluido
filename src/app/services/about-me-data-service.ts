import { Injectable, signal } from '@angular/core';
import { AboutModel } from '../models/about.model';
import { DadosMock } from './dados-mock';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AboutMeDataService {
  
  dadosAboutMe = signal<AboutModel | null>(null);


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

  // updateAboutData(dado: AboutModel){
  //   const dadosAboutMe = this.dadosAboutMe();

  //   const dataUpdated = dadosAboutMe?.map((person: AboutModel) => {
  //     if (dadosAboutMe.id === person.id){
  //       return dadosAboutMe;
  //     } 
  //     return person; 
      
  //   });

  //   this.localStorageService.post('habilities', dataUpdated);
  //   this.dadosAboutMe.set(dataUpdated);
  // }
}
