import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {  MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { PortfolioRoutingModule } from './portfolio.routes';
import { PortfolioHeroComponent } from './components/portfolio-hero/portfolio-hero.component';
import { PortfolioComponent } from './portfolio.component';
import { HolographicBackgroundComponent } from 'src/app/shared/components/three-d-model/three-d-model.component';
import { TypewriterDirective } from 'src/app/shared/@animations/typewritting/typewriter.directive';
import { HolographicRingComponent } from 'src/app/shared/components/3d-model-ring/three-d-ring/three-d-ring.component';
const COMPONENTS = [
  PortfolioHeroComponent,
  PortfolioComponent,
  TypewriterDirective
]
const MAT = [
MatIconModule,
MatButtonModule
]
@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    HolographicRingComponent,
   CommonModule,
   RouterModule,
   HolographicBackgroundComponent,
   ...MAT,
   PortfolioRoutingModule
  ],
})
export class PortfolioModule {}
