import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StatComponent } from './stat.component';
import { AuthGuard } from 'src/app/shared/auth/auth-gaurd';

const routes: Routes = [
  {
    path: '',
    component: StatComponent,
    canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StatRoutingModule {}
