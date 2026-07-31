import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { LoginPage } from './login-page/login-page';
import { LoginModal } from './components/login-modal/login-modal';
import { LoginForm } from './components/login-form/login-form';
import { VisualFeedbackModal } from "../shared/visual-feedback-modal/visual-feedback-modal/visual-feedback-modal";

const routes: Routes = [
  { path: '', component: LoginPage }
];

@NgModule({
  declarations: [
    LoginPage, 
    LoginModal, 
    LoginForm
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    VisualFeedbackModal
],
  exports: [LoginPage],
})
export class LoginPageModule {}
