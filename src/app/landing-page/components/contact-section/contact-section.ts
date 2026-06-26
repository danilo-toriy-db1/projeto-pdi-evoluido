import { Component, input } from '@angular/core';
import { contactPageModel } from '../../../models/contact-page.model';

@Component({
  selector: 'app-contact-section',
  templateUrl: './contact-section.html',
  styleUrl: './contact-section.scss',
  standalone: false
})
export class ContactSection {
  dadosContato = input.required<contactPageModel[]>();
}
