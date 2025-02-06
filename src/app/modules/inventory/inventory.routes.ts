import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/shared/auth/auth-gaurd';
import { InventoryComponent} from './inventory.component';



const routes: Routes = [
  {
    path: '',
    component:InventoryComponent,
    canActivate: [AuthGuard],
    
  },
  
  
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InventoryRoutingModule {}
