import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {jwtDecode} from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly TOKEN_NAME = 'access_token';
  private readonly TOKEN_EXPIRY = 'token_expiry';
  private tokenSubject = new BehaviorSubject<string | null>(null);
  public token$ = this.tokenSubject.asObservable();
  setToken(token: string): void {
    const expiresAt = Date.now() + (60 * 60 * 1000); // Set expiry time
    localStorage.setItem(this.TOKEN_NAME, token);
    localStorage.setItem(this.TOKEN_EXPIRY, expiresAt.toString());
    this.tokenSubject.next(token);
  }
  
  getToken(): string | null {
    const token = localStorage.getItem(this.TOKEN_NAME);
    const expiryString = localStorage.getItem(this.TOKEN_EXPIRY);
    if (token && expiryString) {
      const expiresAt = parseInt(expiryString, 10);
      if (expiresAt > Date.now()) { 
        return token;
      } else {
        this.removeToken(); 
        return null;
      }
    }
    return null;
  }

  removeToken(): void {
    this.tokenSubject.next(null);
    localStorage.removeItem(this.TOKEN_NAME);
  }

  isTokenExpired(token: string): boolean {
    try {
      const decoded: any = jwtDecode(token);
      const expiry = decoded.exp;
      return (Math.floor((new Date).getTime() / 1000)) >= expiry;
    } catch (error) {
      return true;
    }
  }

  validateToken(): boolean {
    const token = this.getToken();
    if (!token) {
      return false;
    }
    return !this.isTokenExpired(token);
  }
}
