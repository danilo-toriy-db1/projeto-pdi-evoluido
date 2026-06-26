import { Routes } from '@angular/router';
import { LandingPage } from './landing-page/landing-page/landing-page';

export const routes: Routes = [
    {path: '', 
    loadChildren: () => import('./landing-page/landing-page-module').then(
        (m) => m.LandingPageModule 
    )},
    {path: 'admin', component: LandingPage},
    {path: '**', redirectTo: ''}
];
