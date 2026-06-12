import { Component } from '@angular/core';
import { CardAboutMe } from "../../utils/card-about-me/card-about-me";

@Component({
  selector: 'app-about-me-page',
  imports: [CardAboutMe],
  templateUrl: './about-me-page.html',
  styleUrl: './about-me-page.scss',
})
export class AboutMePage {}
