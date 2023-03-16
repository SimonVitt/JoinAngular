import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ShowpasswordService } from 'src/app/services/showpassword.service';

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.scss']
})
export class LoginpageComponent {
  @ViewChild('passwordLogin') passwordLogin!: ElementRef;

  loginForm: FormGroup =  new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(4)]),
    rememberMe: new FormControl([Validators.nullValidator])
  });

  passwordShown: boolean = false;
  inputThere: boolean = false;
  authError: boolean = false;


  constructor(private router: Router, private pwervice: ShowpasswordService, private authService: AuthService) {}

  async login() {

    try{
      await this.authService.logIn(this.loginForm.get('username')!.value, this.loginForm.get('password')!.value, this.loginForm.get('rememberMe')!.value);
    }catch(e){
      this.authError = true;
    }
  }

  checkForInput() {
    this.inputThere = this.pwervice.checkForInput(this.passwordLogin);
  }

  showPw(){
    this.passwordShown = this.pwervice.showPw(this.passwordShown, this.passwordLogin);
  }
}
