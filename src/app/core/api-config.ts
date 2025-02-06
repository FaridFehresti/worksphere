import { Injectable } from '@angular/core';
import { environment } from '../../../enviroment/enviroment';

@Injectable({ providedIn: 'root' })
export class APIConfig {
    api_core = environment.appCoreApiUrl
    authUrls = {
        login: this.api_core + '/auth/login',
        register: this.api_core + '/user',
        resetPassword: this.api_core + '/auth/reset-password',
        forgotPassword: this.api_core + '/auth/forgot-password',
        validateToken: this.api_core + '/auth/validate-token',
    }
    userUrls = {
        getUser: this.api_core + '/user',
    }
}