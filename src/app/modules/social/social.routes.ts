import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/shared/auth/auth-gaurd';
import { SocialComponent } from './social.component';



const routes: Routes = [
  {
    path: '',
    component:SocialComponent,
    canActivate: [AuthGuard],
    
  },
  
  
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SocialRoutingModule {}
