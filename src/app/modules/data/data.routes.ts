import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/shared/auth/auth-gaurd';
import { DataComponent} from './data.component';



const routes: Routes = [
  {
    path: '',
    component:DataComponent,
    canActivate: [AuthGuard],
    
  },
  
  
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DataRoutingModule {}
