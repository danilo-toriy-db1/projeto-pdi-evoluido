import { TestBed } from '@angular/core/testing';

import { RenderizaFeedbackService } from './renderiza-feedback.service';
import { FormFeedbackOutput } from '../../models/enums/form-feedback-output';

describe('RenderizaFeedbackService', () => {
  let service: RenderizaFeedbackService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RenderizaFeedbackService);
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  })

  describe('Teste dos caminhos do gerarModalFeedback()', () => {
    it('Fluxo da mensagem de sucesso', async () => {
      const operacao = service.gerarModalFeedback(FormFeedbackOutput.SUCCESS, 'Mensagem de Sucesso');

      expect(service.statusModal()).toBe('carregando');
      expect(service.mensagemFeedback()).toBe('');

      await jest.advanceTimersByTimeAsync(5000);

      expect(service.mensagemFeedback()).toBe('Mensagem de Sucesso');
      expect(service.statusModal()).toBe('sucesso');

      await jest.advanceTimersByTimeAsync(3000);
      await operacao;

      expect(service.mensagemFeedback()).toBe('');
      expect(service.statusModal()).toBe('');
    });

    it('Fluxo da mensagem de Acesso Negado', async () => {
      const operacao = service.gerarModalFeedback(FormFeedbackOutput.FORBIDDEN, 'Mensagem de Acesso Negado');

      expect(service.statusModal()).toBe('carregando');
      expect(service.mensagemFeedback()).toBe('');

      await jest.advanceTimersByTimeAsync(5000);

      expect(service.mensagemFeedback()).toBe('Mensagem de Acesso Negado');
      expect(service.statusModal()).toBe('erro');

      await jest.advanceTimersByTimeAsync(4000);
      await operacao;

      expect(service.mensagemFeedback()).toBe('');
      expect(service.statusModal()).toBe('');
    });

    it('Fluxo da mensagem de Credenciais Inválidas', async () => {
      const operacao = service.gerarModalFeedback(FormFeedbackOutput.MISMATCH, 'Mensagem de Credenciais Inválidas');

      expect(service.statusModal()).toBe('carregando');
      expect(service.mensagemFeedback()).toBe('');

      await jest.advanceTimersByTimeAsync(5000);

      expect(service.mensagemFeedback()).toBe('Mensagem de Credenciais Inválidas');
      expect(service.statusModal()).toBe('erro');

      await jest.advanceTimersByTimeAsync(4000);
      await operacao;

      expect(service.mensagemFeedback()).toBe('');
      expect(service.statusModal()).toBe('');
    });

    it('Fluxo da mensagem padrão (default)', async () => {
      const operacao = service.gerarModalFeedback('Valor Inexistente' as FormFeedbackOutput);

      expect(service.statusModal()).toBe('carregando');
      expect(service.mensagemFeedback()).toBe('');

      await jest.advanceTimersByTimeAsync(5000);

      expect(service.statusModal()).toBe('erro');
      expect(service.mensagemFeedback()).toBe('');

      await jest.advanceTimersByTimeAsync(4000);
      await operacao;

      expect(service.mensagemFeedback()).toBe('');
      expect(service.statusModal()).toBe('');
    });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
