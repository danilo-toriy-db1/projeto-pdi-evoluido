import { Component, effect, input, output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../auth/auth.service/auth.service';
import { Roles } from '../../../models/enums/roles';
import { UserService } from '../../../services/user.service/user.service';
import { FormFeedbackOutput } from '../../../models/enums/form-feedback-output';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.html',
  styleUrl: './login-form.scss',
  standalone: false,
})
export class LoginForm {
  loginForm!: FormGroup;
  cadastro = input<boolean>(false);
  formEmitter = output<FormFeedbackOutput>();

  constructor(private readonly fb: FormBuilder,
              private auth: AuthService,
              private userService: UserService
  ) {
    this.loginForm = this.fb.group({
      usuario: ['', [Validators.required]],
      senha: ['', [Validators.required]],
    });

    effect(() => {
      const cadastro = this.cadastro();

      if(!cadastro){
        this.resetModal();
        return;
      }

      this.configRegister();
    })
  }

  login(){
    const user = this.loginForm.get('usuario')?.value;
    const password = this.loginForm.get('senha')?.value;

    const login = this.auth.login(user, password);

    if(login){
      this.auth.getRole() === Roles.ADMIN 
        ?  this.formEmitter.emit(FormFeedbackOutput.SUCCESS)
        :  this.formEmitter.emit(FormFeedbackOutput.FORBIDDEN);
    } else {
      this.formEmitter.emit(FormFeedbackOutput.MISMATCH)
    }
  }

  configRegister(){
    this.loginForm.addControl('confirm', this.fb.control('', [Validators.required]))
    this.loginForm.addControl('role', this.fb.control('', [Validators.required]));
  }

  register(){
    const user = this.loginForm.get('usuario')?.value;
    const password = this.loginForm.get('senha')?.value;
    const confirm = this.loginForm.get('confirm')?.value;
    const role = this.loginForm.get('role')?.value;

    if(password !== confirm){
      alert('A confirmação de senha está incorreta!');
      return;
    }

    const novoUsuario = {
      id: 0,
      user: user,
      password: password,
      role: role === 'user'
            ? Roles.USUARIO
            : Roles.ADMIN
    }

    this.userService.postUser(novoUsuario);

    alert('Usuário criado com sucesso. Basta realizar o login!');
    this.formEmitter.emit(FormFeedbackOutput.SUCCESS);
  }

  resetModal(){
    this.loginForm.reset();
    if(this.loginForm.contains('confirm')){
      this.loginForm.removeControl('confirm');
      this.loginForm.removeControl('role');
    }
  }
}
