import { Component, computed, inject, input, output, signal } from '@angular/core';
import { DadosMock } from '../../services/dados-mock/dados-mock';
import { HeaderAnchorsModel } from '../../models/header-anchors.model';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { MudaTema } from '../../services/muda-tema/muda-tema';
import { LocalStorageService } from '../../services/local-storage.service/local-storage.service';
import { AuthService } from '../../auth/auth.service/auth.service';

@Component({
  selector: 'app-header',
  imports: [NgClass],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {

  private router = inject(Router);
  private localStorageService = inject(LocalStorageService);

  isLoginPage = input<boolean>();
  paginaSelecionada = output<string>();
  admin = signal<boolean>(false);
  tema = signal<string>('light');
  dadosHeader = computed<HeaderAnchorsModel[]>(() => {
    if(this.isLoginPage()){
      return [];
    }

    if (this.admin()) {
        return this.dados.headerAnchorContent.filter((dado) => {
          return (dado.admin || dado.admin === null);
        })
    } else {
        return this.dados.headerAnchorContent.filter((dado) => {
          return (!dado.admin || dado.admin === null);
    })}
  })

  constructor(private dados: DadosMock,
              public mudaTema: MudaTema,
              private authService: AuthService,
  ){
    this.router.events.subscribe(() => {
      this.admin.set(this.router.url.includes('/admin'))
    })
  }

  getTheme(){
    this.mudaTema.alternarTema();
    this.tema.set(this.localStorageService.get('tema'));
  }

  trocarPagina(pagina: string){
    this.dadosHeader().forEach((dado) => {
      dado.active = (dado.name === pagina);
    });
    this.paginaSelecionada.emit(pagina);
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
