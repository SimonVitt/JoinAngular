import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, EMPTY, empty, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.getToken();
    if (token) {
      request = request.clone({
        setHeaders: { Authorization: `Token ${token}` }
      });
    }
    return next.handle(request).pipe(
      catchError((err) => {
        if (err.status === 401) {
          this.router.navigateByUrl('/login');
          return EMPTY;
        }
        return throwError(() => new Error(err.message));
      })
    );
  }

  getToken(){
    if(localStorage.getItem('token')){
      return localStorage.getItem('token');
    }else{
      return sessionStorage.getItem('token');
    }
  }
}
