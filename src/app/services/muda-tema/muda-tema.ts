import { Injectable, output, signal } from '@angular/core';
import { LocalStorageService } from '../local-storage.service/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class MudaTema {
  
  darkMode = signal<boolean>(false);

  constructor(private localStorage: LocalStorageService){
    if(!localStorage.get<string>('tema')){
      this.darkMode.set(true);
      localStorage.post<string>('tema', 'dark');
    }
  }

  alternarTema(){
    this.darkMode.update(tema => !tema);
    this.localStorage.post<string>('tema', this.darkMode() ? 'dark' : 'light');
  }

}
