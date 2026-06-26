import { Routes } from '@angular/router';

export const routes: Routes = [
    {path: '', 
    loadChildren: () => import('./landing-page/landing-page-module').then(
        (m) => m.LandingPageModule 
    )},
    {path: 'admin', 
    loadChildren: () => import('./painel-admin/painel-admin-module').then(
        (m) => m.PainelAdminModule
    )},
    {path: '**', redirectTo: ''}
];
