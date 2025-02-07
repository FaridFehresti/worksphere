import { Component } from '@angular/core';
import {  MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';
import { AuthOperationService } from 'src/app/modules/auth/services/auth-operation.service';
import { ConfirmPopUpAnimation } from '../confirm-popup/confirm-popup.component';
import { IUserData } from '../../interfaces/types';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  standalone: true,
  imports: [MatButtonModule, MatMenuModule, ConfirmPopUpAnimation],
})
export class ProfileComponent {
  userData!:IUserData;
  constructor( private authOp: AuthOperationService, private router: Router) {
    this.userData = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '') : '';
    console.log(this.userData);
  }
  onLogOut(): void {
    this.authOp.logOut()
    this.router.navigate(['/auth/login']);
    
  }
}
