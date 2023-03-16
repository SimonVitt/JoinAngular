import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent {
  emailForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  })

  emailError: boolean = false;
  emailSuccess: boolean = false;

  sendMail(){
    try{
      console.log(this.emailForm.get('email')!.value);
      this.emailSuccess =true;
      this.emailError = false;
      this.emailForm.get('email')!.reset();
    }catch(e){
      this.emailError = true;
      this.emailSuccess =false;
    }
    
  }

}
