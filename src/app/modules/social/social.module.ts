import { NgModule } from '@angular/core';
import { SocialRoutingModule } from './social.routes';
import { SocialComponent } from './social.component';

const MAT = [

];
const PAGES = [
    
];
const COMPONENTS = [
    SocialComponent
]

@NgModule({
  declarations: [...COMPONENTS],
  imports: [],
  providers:[SocialRoutingModule]
})
export class SocialModule { }
