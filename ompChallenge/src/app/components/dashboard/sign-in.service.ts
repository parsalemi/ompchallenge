import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Subject } from "rxjs";
export interface UserClaim{
  id: string;
  email: string;
  full_name: string;
  exp: number;
}
@Injectable({
  providedIn: 'root'
})
export class SignInService {

  constructor(private _http: HttpClient) {
    const claim = localStorage.getItem('claim')
    if(claim){
      this.userClaim$.next(JSON.parse(claim))
    }
  }
  baseUrl = 'http://localhost:8080';
  token: string = '';
  userClaim$ = new BehaviorSubject<UserClaim | undefined>(undefined);

  userSignIn(data: any){
    return this._http.post(this.baseUrl + '/users/signin', data );
  }
  user(){
    return this._http.get(this.baseUrl + '/users');
  }
  setToken(token: string){
    this.token = token;
    localStorage.setItem('token', token);
    const claim:UserClaim = JSON.parse(atob(token.split('.')[1]));
    localStorage.setItem('claim',JSON.stringify(claim))
    this.userClaim$.next(claim);

  }
}
