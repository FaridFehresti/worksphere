import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routes';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {  HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './modules/auth/interceptors/auth-interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatButtonModule } from '@angular/material/button';
import { SettingComponent } from './shared/components/setting/setting.component';
import { ProfileComponent } from './shared/components/profile/profile.component';
import { CircularMenuComponent } from './shared/components/circular-menu/circular-menu.component';
import { HolographicBackgroundComponent } from './shared/components/three-d-model/three-d-model.component';
import { NativeDateAdapter, provideNativeDateAdapter } from '@angular/material/core';


const COMPONENTS = [
  AppComponent,
  
]

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    CommonModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SettingComponent,
    ProfileComponent,
    CircularMenuComponent,
    MatButtonModule,
    HolographicBackgroundComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    provideAnimationsAsync(),
    provideNativeDateAdapter()
  ],

  bootstrap: [AppComponent] ,

})
export class AppModule { }
