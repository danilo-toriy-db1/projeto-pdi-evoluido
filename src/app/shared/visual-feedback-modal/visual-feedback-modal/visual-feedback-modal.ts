import { Component, input } from '@angular/core';

@Component({
  selector: 'app-visual-feedback-modal',
  imports: [],
  templateUrl: './visual-feedback-modal.html',
  styleUrl: './visual-feedback-modal.scss',
  standalone: true
})
export class VisualFeedbackModal {

  estado = input<string>();
  mensagem = input<string>();
}
