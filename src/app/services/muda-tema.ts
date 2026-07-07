import { Injectable, signal } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class MudaTema {
  
  darkMode = signal<boolean>(false);

  constructor(private localStorage: LocalStorageService){
    if(!localStorage.get('tema')){
      this.darkMode.set(true);
      localStorage.post('tema', 'dark');
    }
  }

  alternarTema(){
    this.darkMode.update(tema => !tema);
    this.localStorage.post('tema', this.darkMode() ? 'dark' : 'light');
  }

}
