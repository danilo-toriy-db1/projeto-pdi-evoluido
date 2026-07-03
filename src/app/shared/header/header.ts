import { Component, computed, inject, output, signal } from '@angular/core';
import { DadosMock } from '../../services/dados-mock';
import { HeaderAnchorsModel } from '../../models/header-anchors.model';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [NgClass],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {

  private router = inject(Router);

  paginaSelecionada = output<string>();
  admin = signal<boolean>(false);
  dadosHeader = computed<HeaderAnchorsModel[]>(() => {
    if (this.admin()) {
       return this.dados.headerAnchorContent.filter((dado) => {
          return (dado.admin || dado.admin === null);
       })
    } else {
        return this.dados.headerAnchorContent.filter((dado) => {
          return (!dado.admin || dado.admin === null);
    })}
  })

  constructor(private dados: DadosMock){
    this.router.events.subscribe(() => {
      this.admin.set(this.router.url.includes('/admin'))
    })
  }

  


  trocarPagina(pagina: string){
    console.log(pagina);
    this.dadosHeader().forEach((dado) => {
      dado.active = (dado.name === pagina);
    });
    this.paginaSelecionada.emit(pagina);
  }
}
