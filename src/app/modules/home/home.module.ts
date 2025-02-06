import { NgModule } from '@angular/core';
import { HomeRoutingModule } from './home.routes';
import { HomeComponent } from './home.component';
import { MatButtonModule } from '@angular/material/button';
import { ConfirmPopUpAnimation, ConfirmPopUpComponent } from 'src/app/shared/components/confirm-popup/confirm-popup.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatBadgeModule} from '@angular/material/badge';
import { ProfileComponent } from '../../shared/components/profile/profile.component';
import {MatMenuModule} from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { ClockComponent } from 'src/app/shared/components/clock/clock.component';
import { CircleComponent } from 'src/app/shared/components/circular-menu/circle/circle.component';


const MAT = [
  MatButtonModule,
  MatTabsModule,
  MatBadgeModule,
  MatMenuModule,
  MatCardModule,
];

const PAGES = [
    
];
const COMPONENTS = [
    HomeComponent, 
]

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    HomeRoutingModule,
    ConfirmPopUpAnimation,
    ConfirmPopUpComponent,
    ClockComponent,
    CircleComponent,
    ...MAT,
  ],
  providers:[
  ]
})
export class HomeModule { }
