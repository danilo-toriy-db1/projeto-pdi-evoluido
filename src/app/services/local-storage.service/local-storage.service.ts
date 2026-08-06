import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  
  get<T>(chave: string): T | null {
    try {
      const dado = localStorage.getItem(chave);
      if(dado){
        return JSON.parse(dado) as T;
      }
      return null;
    } catch (erro: any) {
      console.error('Erro ao buscar o item no LocalStorage: ', erro);
      return null;
    }
  }

  post<T>(chave: string, valor: T): void{
    try {
      const dado = JSON.stringify(valor);
      localStorage.setItem(chave, dado);
    } catch (erro: any) {
      console.error('Erro ao salvar o item no LocalStorage: ', erro);
    }
  }
}
