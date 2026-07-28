import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPage } from './landing-page/landing-page';
import { InitialPage } from './pages/initial-page/initial-page';
import { AboutMePage } from './pages/about-me-page/about-me-page';
import { HabilitiesPage } from './pages/habilities-page/habilities-page';
import { ContactPage } from './pages/contact-page/contact-page';
import { CardInitialPage } from '../shared/card-initial-page/card-initial-page';
import { CardAboutMe } from '../shared/card-about-me/card-about-me';
import { CardHability } from './components/card-hability/card-hability';
import { ContactSection } from './components/contact-section/contact-section';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: LandingPage }
]

@NgModule({
  declarations: [
    LandingPage,
    InitialPage,
    AboutMePage,
    HabilitiesPage,
    ContactPage,
    CardHability,
    ContactSection
  ],
  imports: [CommonModule, 
            CardInitialPage,
            CardAboutMe,
            RouterModule.forChild(routes)],
  exports: [LandingPage],
})
export class LandingPageModule {}
