import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { APIConfig } from "../../../core/api-config";
import { AuthService } from "./auth.service";

@Injectable({
    providedIn: 'root'
  })
export class AuthOperationService {
    constructor(private http: HttpClient, private apiConfig: APIConfig, private authService: AuthService ) { }

    /** Homeworks api */
    loginUser(body:any): Observable<any> {
      return this.http.post<any>(this.apiConfig.authUrls.login, body);
    }
    RegisterUser(body:any): Observable<any> {
      return this.http.post<any>(this.apiConfig.authUrls.register, body);
    }
    getUser(){
      return this.http.get<any>(this.apiConfig.userUrls.getUser);
    }
    logOut(){
      this.authService.removeToken()
    }
    
}