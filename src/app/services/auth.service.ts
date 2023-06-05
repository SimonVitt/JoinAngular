import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})



export class AuthService {
  BASEURL = 'https://joinbackendanywhere.pythonanywhere.com/';

  constructor(private router: Router, private http: HttpClient) { }

  async logIn(username: string, pw: string, rememberMe: boolean) {
    let resp: any = await this.loginWithUsernameAndPw(username, pw);
    if (rememberMe) {
      localStorage.setItem('token', resp['token']);
      localStorage.setItem('username', resp['username']);
    } else {
      sessionStorage.setItem('token', resp['token']);
      sessionStorage.setItem('username', resp['username']);
    }
    this.router.navigateByUrl(`yourboards`);
  }

  async loginWithUsernameAndPw(username: string, pw: string) {
    const body = {
      "username": username,
      "password": pw
    }
    return await lastValueFrom(this.http.post(this.BASEURL + "members/login/", body));
  }

  async logout() {
    localStorage.removeItem('username');
    sessionStorage.removeItem('username');
    if (sessionStorage.getItem('token') || localStorage.getItem('token')) {
      await lastValueFrom(this.http.post(this.BASEURL + "members/logout/", {}));
      localStorage.removeItem('token');
      sessionStorage.removeItem('token');
    }
    this.router.navigateByUrl(`login`);
  }

  userIsAuthenticated() {
    let tokenL = localStorage.getItem('token');
    let tokenS = sessionStorage.getItem('token');
    if (tokenL) {
      if (tokenL!.length > 20) {
        return true;
      }
      return false;
    }
    if (tokenS) {
      if (tokenS!.length > 20) {
        return true;
      }
      return false;
    }
    return false;
  }

  async signup(username: string, pw: string, email: string) {
    const body = {
      "username": username,
      "password": pw,
      "email": email
    }
    return await lastValueFrom(this.http.post(this.BASEURL + "members/signup/", body));
  }

}
