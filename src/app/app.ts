import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './template/header/header';
import { Footer } from './template/footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('projeto-angular-pdi');
}
