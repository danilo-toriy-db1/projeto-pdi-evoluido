import { Routes } from '@angular/router';
import { AdminGuard } from './auth/admin.guard';

export const routes: Routes = [
    {path: 'landing-page', 
    loadChildren: () => import('./landing-page/landing-page-module').then(
        (m) => m.LandingPageModule 
    )},
    {path: 'admin', 
    canActivate: [AdminGuard],
    loadChildren: () => import('./painel-admin/painel-admin-module').then(
        (m) => m.PainelAdminModule
    )},
    {path: 'login',
    loadChildren: () => import('./login-page/login-page-module').then(
        (m) => m.LoginPageModule
    )},
    {path: '', redirectTo: 'landing-page', pathMatch: 'full'},
    {path: '**', redirectTo: 'landing-page'}
];
