import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { SignuppageComponent } from './signuppage/signuppage.component';
import { PasswordComponent } from './password/password.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LoginpageComponent,
    SignuppageComponent,
    PasswordComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class LoginModule { }
