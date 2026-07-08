import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InitialPage } from './pages/initial-page/initial-page';
import { PainelAdmin } from './painel-admin/painel-admin';
import { RouterModule, Routes } from '@angular/router';
import { CardInitialPage } from '../shared/card-initial-page/card-initial-page';
import { CardAboutMe } from '../shared/card-about-me/card-about-me';
import { EditPage } from './pages/edit-page/edit-page';
import { ReactiveFormsModule, ɵInternalFormsSharedModule } from "@angular/forms";
import { EditModal } from '../shared/edit-modal/edit-modal';

const routes: Routes = [
  { path: '', component: PainelAdmin}
];

@NgModule({
  declarations: [
    InitialPage,
    EditPage,
    PainelAdmin,
  ],
  imports: [CommonModule,
    CardInitialPage,
    CardAboutMe,
    ReactiveFormsModule,
    EditModal,
    RouterModule.forChild(routes), ɵInternalFormsSharedModule],
  exports: [PainelAdmin]
})
export class PainelAdminModule {}
