import { ElementRef, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShowpasswordService {

  constructor() { }

  //-****************************PASSWORD SHOW AND HIDE FUNCTIONS*****************************************************************

  /**
   * This functions checks if the user put something in the inputfield
   */
  checkForInput(passwordLogin:ElementRef) {
    if (passwordLogin.nativeElement.value.length > 0){
      return true;
    }else{
      return false;
    }
  }

  showPw(passwordShown: boolean, passwordLogin:ElementRef){
    if(passwordShown){
      passwordLogin.nativeElement.type = 'password';
      return false;
    }else{
      passwordLogin.nativeElement.type = 'text';
      return true;
    }
  }
}
