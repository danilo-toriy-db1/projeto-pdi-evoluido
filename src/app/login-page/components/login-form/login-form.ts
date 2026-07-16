import { Component, effect, input, output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalStorageService } from '../../../services/local-storage.service/local-storage.service';
import { AuthService } from '../../../auth/auth.service/auth.service';
import { Router } from '@angular/router';
import { Roles } from '../../../models/enums/roles';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.html',
  styleUrl: './login-form.scss',
  standalone: false,
})
export class LoginForm {
  loginForm!: FormGroup;
  cadastro = input<boolean>(false);
  formSucesso = output<void>();

  constructor(private readonly fb: FormBuilder,
              private auth: AuthService,
              private router: Router,
              private localStorageService: LocalStorageService
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
      this.formSucesso.emit();
      this.auth.getRole() === Roles.ADMIN 
        ?  this.router.navigate(['/admin'])
        :  this.router.navigate(['/login']);
    } else {
      alert('Credenciais inválidas!')
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

    const usuarios = this.localStorageService.get('users');
    const novoUsuario = {
      user: user,
      password: password,
      role: role === 'user'
            ? Roles.USUARIO
            : Roles.ADMIN
    }
    usuarios.push(novoUsuario)
    this.localStorageService.post('users', usuarios);
    alert('Usuário criado com sucesso. Basta realizar o login!');
    this.formSucesso.emit();
  }

  resetModal(){
    this.loginForm.reset();
    if(this.loginForm.contains('confirm')){
      this.loginForm.removeControl('confirm');
      this.loginForm.removeControl('role');
    }
  }

  

  
}
