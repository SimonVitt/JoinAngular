import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})



export class AuthService {

  constructor(private router: Router, private http: HttpClient) { }

  async logIn(username: string, pw: string) {
    let resp: any = await this.loginWithUsernameAndPw(username, pw);
    localStorage.setItem('token', resp['token']);
    localStorage.setItem('username', resp['username']);
    this.router.navigateByUrl(`yourboards`);
  }

  loginWithUsernameAndPw(username: string, pw: string) {
    const body = {
      "username": username,
      "password": pw
    }
    return lastValueFrom(this.http.post("http://127.0.0.1:8000/members/login/", body));
  }

  logout(){
    localStorage.removeItem('username');
    localStorage.removeItem('id');
    lastValueFrom(this.http.get("http://127.0.0.1:8000/members/logout/"));
    //localStorage.removeItem('token');
    //this.router.navigateByUrl('login');
  }

  userIsAuthenticated(){
    let token = localStorage.getItem('token');
    if(localStorage.getItem('token')){
      if(token!.length > 20){
        return true;
      }
      return false;
    }
    return false;
  }

}
