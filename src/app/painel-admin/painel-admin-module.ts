import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InitialPage } from './pages/initial-page/initial-page';
import { PainelAdmin } from './painel-admin/painel-admin';
import { RouterModule, Routes } from '@angular/router';
import { CardInitialPage } from '../shared/card-initial-page/card-initial-page';

const routes: Routes = [
  { path: '', component: PainelAdmin}
];

@NgModule({
  declarations: [
    InitialPage,
    PainelAdmin
  ],
  imports: [CommonModule, 
            CardInitialPage,
            RouterModule.forChild(routes)],
  exports: [PainelAdmin]
})
export class PainelAdminModule {}
