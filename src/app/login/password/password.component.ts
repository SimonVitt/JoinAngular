import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GetDataService } from 'src/app/services/get-data.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent {
  emailForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  });

  emailError: boolean = false;
  emailSuccess: boolean = false;

  constructor(private loadingService: LoadingService, private dataService: GetDataService){}

  async sendMail(){
    this.loadingService.setLoading(true);
    try{
      let body = {
        "email": this.emailForm.get('email')!.value
      }
      await this.dataService.sendEmailReset(body)
      this.emailSuccess =true;
      this.emailError=false;
      this.emailForm.get('email')!.reset();
    }catch(e){
      this.emailError = true;
      this.emailSuccess =false;
    }
    this.loadingService.setLoading(false);
  }

}
