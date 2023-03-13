import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ShowpasswordService } from 'src/app/services/showpassword.service';

@Component({
  selector: 'app-signuppage',
  templateUrl: './signuppage.component.html',
  styleUrls: ['./signuppage.component.scss']
})
export class SignuppageComponent {
  @ViewChild('passwordSignUp') passwordSignUp!: ElementRef;

  passwordShown: boolean = false;
  inputThere: boolean = false;


  constructor(private router: Router, private pwervice: ShowpasswordService) { }

  signUp(){

  }

  checkForInput() {
    this.inputThere = this.pwervice.checkForInput(this.passwordSignUp);
  }

  showPw(){
    this.passwordShown = this.pwervice.showPw(this.passwordShown, this.passwordSignUp);
  }
  
  
}
