import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserForLogin, UserForRegister } from '../models/IUser';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = environment.baseUrl;
  jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient) { }


  registerUser(user: UserForRegister) {
    return this.http.post(this.baseUrl + '/account/register', user);
  }

  authUser(user: UserForLogin) {
    return this.http.post(this.baseUrl + '/account/login', user);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isUserLoggedIn() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }
}
