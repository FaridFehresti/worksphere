import { NgModule } from '@angular/core';
import { SocialRoutingModule } from './social.routes';
import { SocialComponent } from './social.component';
import { HolographicRingComponent } from 'src/app/shared/components/3d-model-ring/three-d-ring/three-d-ring.component';

const MAT = [

];
const PAGES = [
    
];
const COMPONENTS = [
    SocialComponent
]

@NgModule({
  declarations: [...COMPONENTS],
  imports: [HolographicRingComponent],
  providers:[SocialRoutingModule]
})
export class SocialModule { }
