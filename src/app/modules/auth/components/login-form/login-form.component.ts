import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { AuthOperationService } from '../../services/auth-operation.service';
import { Router } from '@angular/router';
import {  bounceInDownAnimation, } from 'src/app/shared/@animations/bouncing-entrances';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  animations:[
          bounceInDownAnimation(),
          ]
})
export class LoginFormComponent implements OnInit, OnDestroy {
  private readonly TOKEN_NAME = 'access_token'
  loginSub: Subscription | null = null;
  userSub:Subscription | null = null
  hide: boolean = true;
  error:{text:string, hasError:boolean} = {text:'', hasError:false}
  animationState = false;
  isSubmiting:boolean = false;
  animationWithState = false;
  loginForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });
  
 get token(){
  return localStorage.getItem(this.TOKEN_NAME)
 }
 constructor( private spinner: NgxSpinnerService,private router: Router,private authOp: AuthOperationService, private fb: FormBuilder, private authService: AuthService) { } // Inject AuthService
 
  ngOnInit(): void {
   
  }
  animate() {
    this.animationState = false;
    setTimeout(() => {
        this.animationState = true;
        this.animationWithState = !this.animationWithState;
    }, 1);
}
  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isSubmiting = true
      this.spinner.show();
      const data = {
        email: this.loginForm.value.email!,
        password: this.loginForm.value.password!,
      };

      this.loginSub = this.authOp.loginUser(data).subscribe({
        next: res => {
          if (res?.access_token) {
            this.error = {text:'', hasError:false}
            this.spinner.hide();
            this.isSubmiting = false
            
            this.authService.setToken(res.access_token); // Use AuthService to set the token
            this.router.navigate(['/']);
          }else{
            this.error = {text:res.message+'. Please try again!', hasError:true}
            this.animate();
            
          }
        },
        error: err => {
          this.error = {text:err.error.message, hasError:true}
          this.spinner.hide();

        },
        complete: () => {
          this.isSubmiting = false
        }
        
      });
    }
  }

  updateErrorMessage(controlName: string): void {
    if (this.loginForm.get(controlName)?.hasError('email')) {
      this.loginForm.get(controlName)?.setErrors({ email: true });
    }
  }

  onShowPasswordClick(event: MouseEvent) {
    this.hide = !this.hide;
    event.stopPropagation();
  }

  ngOnDestroy(): void {
    this.loginSub?.unsubscribe();
    this.userSub?.unsubscribe();
  }
}
