import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalStorageService } from '../../../services/local-storage.service';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { Roles } from '../../../models/enums/roles';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.html',
  styleUrl: './login-form.scss',
  standalone: false,
})
export class LoginForm implements OnInit {
  loginForm!: FormGroup;

  constructor(private readonly fb: FormBuilder,
              private auth: AuthService,
              private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      usuario: ['', [Validators.required]],
      senha: ['', [Validators.required]],
    });
  }

  login(){
    const user = this.loginForm.get('usuario')?.value;
    const password = this.loginForm.get('senha')?.value;

    const login = this.auth.login(user, password);

    if(login){
      this.auth.getRole() === Roles.ADMIN 
        ?  this.router.navigate(['/admin'])
        :  this.router.navigate(['/landing-page']);
    } else {
      alert('Credenciais inválidas!')
    }
  }

  
}
