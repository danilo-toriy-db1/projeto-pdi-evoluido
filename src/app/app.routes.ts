import { Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { AdminGuard } from './auth/admin.guard';

export const routes: Routes = [
    {path: 'landing-page', 
    canActivate: [AuthGuard],
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
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: '**', redirectTo: 'login'}
];
