import { Injectable, signal } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { ArrayHabilitiesModel } from '../models/array-habilities.model';
import { DadosMock } from './dados-mock';

@Injectable({
  providedIn: 'root',
})
export class HabilitiesDataService {

  habilities = signal<ArrayHabilitiesModel[]>([]);


  constructor(private localStorageService: LocalStorageService,
              private dados: DadosMock
  ){
      const dadosLocal = this.localStorageService.get('habilities');
      if(dadosLocal && dadosLocal.length > 0 ){
        this.habilities.set(dadosLocal);
      }else{
        this.habilities.set(this.dados.habilities);
        this.localStorageService.post('habilities', this.dados.habilities)
      }
  }

  updateHabilities(hability: ArrayHabilitiesModel){
    const habilities = this.habilities();

    const habilitiesUpdated = habilities.map((habilityItem: ArrayHabilitiesModel) => {
      if (habilityItem.id === hability.id){
        return hability;
      } 
      return habilityItem 
      
    });

    this.localStorageService.post('habilities', habilitiesUpdated);
    this.habilities.set(habilitiesUpdated);
  }
}
