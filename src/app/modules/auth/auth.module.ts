import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { AuthRoutingModule } from './auth.routes';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { AuthComponent } from './auth.component'; 
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { RessetPasswordFormComponent } from './components/resset-password-form/resset-password-form.component';
import {MatGridListModule}from '@angular/material/grid-list'
import {MatDatepickerModule}from '@angular/material/datepicker'
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import {MatProgressBarModule} from '@angular/material/progress-bar';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth-interceptor';
import { AnimationTesterComponent } from 'src/app/shared/components/animation-tester/animation.component';
import { HolographicBackgroundComponent } from 'src/app/shared/components/three-d-model/three-d-model.component';


const MAT = [
  MatInputModule,
  MatButtonModule,
  MatSelectModule,
  MatRadioModule,
  MatCardModule,
  ReactiveFormsModule,
  MatGridListModule,
  MatDatepickerModule,
  MatIconModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
];

const PAGES = [
  LoginFormComponent,
  AuthComponent ,
  RegisterFormComponent,
  RessetPasswordFormComponent
];

@NgModule({
  declarations: [...PAGES],
  imports: [
    ...MAT,
    AnimationTesterComponent,
    AuthRoutingModule,
    HolographicBackgroundComponent
  ],
  providers:[
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    provideNativeDateAdapter()
  ],

})
export class AuthModule { }


  

