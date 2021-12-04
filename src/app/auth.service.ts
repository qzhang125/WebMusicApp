import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from './../environments/environment';

import { JwtHelperService } from '@auth0/angular-jwt';

const helper = new JwtHelperService();

import User from './User';
import RegisterUser from './RegisterUser';
import { LocationStrategy } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor( private http: HttpClient) { }
  getToken(): string | null{
    return localStorage.getItem("access_token");
  }
  readToken(): User | null{
    let token = this.getToken();
    if(token){
      return helper.decodeToken(token);
    }else{
      return null; 
    }
  }
  isAuthenticated(): boolean{
    let token = this.getToken();
    if(token){
      return true;
    }else{
      return false;
    }
  }
  login(user: User): Observable<any>{
    return this.http.post<any>(`${environment.userAPIBase}/login`, user);
  }
  logout(){
    return localStorage.removeItem("access_token");
  }
  register(registerUser: RegisterUser): Observable<any>{
    return this.http.post<any>(`${environment.userAPIBase}/register`, registerUser);
  }
}