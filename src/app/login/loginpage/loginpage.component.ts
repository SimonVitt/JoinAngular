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

  loginForm: FormGroup | any;

  passwordShown: boolean = false;
  inputThere: boolean = false;


  constructor(private router: Router, private pwervice: ShowpasswordService, private authService: AuthService) { 
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  async login() {

    try{
      await this.authService.logIn(this.loginForm.get('username').value, this.loginForm.get('password').value);
    }catch(e){
      console.log(e);
      //show wrong details
    }
  }

  checkForInput() {
    this.inputThere = this.pwervice.checkForInput(this.passwordLogin);
  }

  showPw(){
    this.passwordShown = this.pwervice.showPw(this.passwordShown, this.passwordLogin);
  }
}
