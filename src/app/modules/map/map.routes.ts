import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/shared/auth/auth-gaurd';
import { MapComponent } from './map.component';



const routes: Routes = [
  {
    path: '',
    component:MapComponent,
    canActivate: [AuthGuard],
    
  },
  
  
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MapRoutingModule {}
