import { Component, effect, ElementRef, inject, input, viewChild } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Users } from '../../models/users';
import { Roles } from '../../models/enums/roles';
import { UserService } from '../../services/user.service/user.service';
import { FormFeedbackOutput } from '../../models/enums/form-feedback-output';
import { VisualFeedbackModal } from "../visual-feedback-modal/visual-feedback-modal/visual-feedback-modal";
import { RenderizaFeedbackService } from '../../services/renderiza-feedback.service/renderiza-feedback.service';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.html',
  styleUrl: './user-modal.scss',
  standalone: true,
    imports: [ReactiveFormsModule, VisualFeedbackModal]
})
export class UserModal {

  private renderizaFeedbackService = inject(RenderizaFeedbackService);
  
  userEditForm!: FormGroup;
  usuarioSelecionado = input<Users | null>();
  modoCadastro = input<boolean>();
  private modal = viewChild<ElementRef<HTMLDialogElement>>('userEditModal');
  private primeiraRenderizacaoFlag: boolean = true;
  protected readonly roles = Roles;
  mostraFeedback = false;
  statusModal = this.renderizaFeedbackService.statusModal;
  mensagemFeedback = this.renderizaFeedbackService.mensagemFeedback;

  constructor(private fb: FormBuilder,
              private userService: UserService
  ){
    this.userEditForm = this.fb.group({
      username: [''],
      password: [''],
      role: [''],
      confirm: ['']
    })

    effect(() => {
      const user = this.usuarioSelecionado();

      if(!this.usuarioSelecionado()){
        if(!this.primeiraRenderizacaoFlag){
          console.error('Não foi possível capturar os dados do usuário selecionado');
          return;
        }

        this.primeiraRenderizacaoFlag = false;
        return;
      }

      this.primeiraRenderizacaoFlag = false;
      if(this.modoCadastro()){
        this.configModalAdicionar();
        return;
      }

      this.userEditForm.patchValue({
        username: this.usuarioSelecionado()?.user,
        password: this.usuarioSelecionado()?.password,
        role: this.usuarioSelecionado()?.role === this.roles.ADMIN
                                                  ? this.roles.ADMIN
                                                  : this.roles.USUARIO
      })
    })
  }

  abrirModal(){
    this.mostraFeedback = false;
    this.modal()?.nativeElement.showModal();
  }

  fecharModal(){
    this.mostraFeedback = false;
    this.modal()?.nativeElement.close();
  }

  configModalAdicionar(){
    this.userEditForm.reset();
    this.abrirModal();
  }

  enviarDados(){
    const usuarioAntigo = this.usuarioSelecionado();
    const usuarioAtualizado: Users = {
      id: usuarioAntigo!.id,
      user: this.userEditForm.get('username')?.value,
      password: this.userEditForm.get('password')?.value,
      role: this.userEditForm.get('role')?.value
    }
    
    this.aguardarFeedback(FormFeedbackOutput.SUCCESS, 'Usuário atualizado com Sucesso!');
    this.userService.updateUser(usuarioAtualizado);
  }

  removerUsuario(){
    const usuario = this.usuarioSelecionado() as Users;
    this.userService.deleteUserById(usuario);
    this.aguardarFeedback(FormFeedbackOutput.SUCCESS, 'Usuário removido com Sucesso!');
  }

  adicionarUsuario(){
    const novoUsuario: Users = {
      id: -1,
      user: this.userEditForm.get('username')?.value,
      password: this.userEditForm.get('password')?.value,
      role: this.userEditForm.get('role')?.value
    }

    const confirm = this.userEditForm.get('confirm')?.value;

    if(novoUsuario.password !== confirm){
      this.aguardarFeedback(FormFeedbackOutput.MISMATCH, 'As senhas não coincidem');
      return;
    }

    this.aguardarFeedback(FormFeedbackOutput.SUCCESS, 'Usuário Adicionado com Sucesso!');
    this.userService.postUser(novoUsuario);
  }

  async aguardarFeedback(status: FormFeedbackOutput, mensagem?: string){
    this.mostraFeedback = true;
    await this.renderizaFeedbackService.gerarModalFeedback(status, mensagem);

    this.mostraFeedback = false;
    this.fecharModal();
  }
}
