import { Injectable } from '@angular/core';
import type { AboutModel } from '.././models/about.model.js'


@Injectable({
  providedIn: 'root',
})
export class DadosMock {
  about: AboutModel = {
    nome: "Danilo Riki Toriy",
    idade: 19,
    carreira: "Estudante de Engenharia de Software",
    profissao: "Estagiário de Desenvolvimento de Software",
    empresa: "DB1 Global Software",
    descricao: {
        biografia: "bla bla bla",
        hobbies: "bla bla bla",
        desgostos: "bla bla bla",
        objetivos: "bla bla bla"
    }
  }
}
