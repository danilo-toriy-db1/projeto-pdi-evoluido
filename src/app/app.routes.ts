import { Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

export const routes: Routes = [
    {path: '', 
    //canActivate: [AuthGuard],
    loadChildren: () => import('./landing-page/landing-page-module').then(
        (m) => m.LandingPageModule 
    )},
    {path: 'admin', 
    loadChildren: () => import('./painel-admin/painel-admin-module').then(
        (m) => m.PainelAdminModule
    )},
    {path: 'login',
    loadChildren: () => import('./login-page/login-page-module').then(
        (m) => m.LoginPageModule
    )},
    {path: '**', redirectTo: ''}
];
