import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { AuthGuard } from 'src/app/shared/auth/auth-gaurd';



const routes: Routes = [
  {
    path: '',
    component:HomeComponent,
    canActivate: [AuthGuard],
    
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
