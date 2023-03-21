import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingService } from 'src/app/services/loading.service';
import { ShowpasswordService } from 'src/app/services/showpassword.service';

@Component({
  selector: 'app-signuppage',
  templateUrl: './signuppage.component.html',
  styleUrls: ['./signuppage.component.scss']
})
export class SignuppageComponent {
  @ViewChild('passwordSignUp') passwordSignUp!: ElementRef;
  signupForm: FormGroup =  new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(4)])
  });

  errorCreate: boolean = false;
  errorLogin: boolean = false;
  passwordShown: boolean = false;
  inputThere: boolean = false;


  constructor(private router: Router, private pwervice: ShowpasswordService, private authService: AuthService, private loadingService: LoadingService) { }

  async signUp(){
    this.loadingService.setLoading(true);
    const username: string = this.signupForm.get('username')!.value;
    const password: string = this.signupForm.get('password')!.value;
    const email: string = this.signupForm.get('email')!.value;
    try{
      await this.authService.signup(username, password, email);
      await this.login(username, password);
    }catch(e){
      this.errorCreate = true;
    }
    this.loadingService.setLoading(false);
  }

  async login(username: string, password: string){
    try{
      await this.authService.logIn(username, password, true);
    }catch(e){
      this.errorLogin = true;
    }
  }

  checkForInput() {
    this.inputThere = this.pwervice.checkForInput(this.passwordSignUp);
  }

  showPw(){
    this.passwordShown = this.pwervice.showPw(this.passwordShown, this.passwordSignUp);
  }
  
  
}
