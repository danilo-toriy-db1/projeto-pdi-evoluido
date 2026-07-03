import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
    private isAuthenticated = signal<boolean>(false);

  login(){
    this.isAuthenticated.set(true);
  }

  logout(){
    this.isAuthenticated.set(false);
  }

  haveLogin(){
    return this.isAuthenticated;
  }
}
