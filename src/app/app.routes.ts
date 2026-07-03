import { Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LoginPage } from './shared/login-page/login-page';

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
    {path: 'login', component: LoginPage
    },
    {path: '**', redirectTo: ''}
];
