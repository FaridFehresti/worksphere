import { Component } from '@angular/core';
import {  MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';
import { AuthOperationService } from 'src/app/modules/auth/services/auth-operation.service';
import { ConfirmPopUpAnimation } from '../confirm-popup/confirm-popup.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  standalone: true,
  imports: [MatButtonModule, MatMenuModule, ConfirmPopUpAnimation],
})
export class ProfileComponent {
  constructor( private authOp: AuthOperationService, private router: Router) {

  }
  onLogOut(): void {
    this.authOp.logOut()
    this.router.navigate(['/auth/login']);
    
  }
}
