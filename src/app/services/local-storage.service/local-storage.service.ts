import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  
  get(chave: string): any {
    try {
      const dado = localStorage.getItem(chave);
      if(dado){
        return JSON.parse(dado);
      }
      return null;
    } catch (erro: any) {
      console.error('Erro ao buscar o item no LocalStorage: ', erro);
    }
  }

  post(chave: string, valor: any): any{
    try {
      const dado = JSON.stringify(valor);
      localStorage.setItem(chave, dado);
    } catch (erro: any) {
      console.error('Erro ao salvar o item no LocalStorage: ', erro);
    }
  }
}
