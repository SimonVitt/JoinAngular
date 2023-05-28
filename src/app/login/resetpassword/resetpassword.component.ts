import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ResetPasswordBody } from 'src/app/interfaces/resetPasswordBody';
import { AuthService } from 'src/app/services/auth.service';
import { GetDataService } from 'src/app/services/get-data.service';
import { LoadingService } from 'src/app/services/loading.service';
import { ShowpasswordService } from 'src/app/services/showpassword.service';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})
export class ResetpasswordComponent {
  @ViewChild('password1') password1!: ElementRef;
  @ViewChild('password2') password2!: ElementRef;

  resetPwForm: FormGroup = new FormGroup({
    password1: new FormControl('', [Validators.required, Validators.minLength(4)]),
    password2: new FormControl('', [Validators.required, Validators.minLength(4)])
  });

  passwordShown1: boolean = false;
  inputThere1: boolean = false;
  passwordShown2: boolean = false;
  inputThere2: boolean = false;

  passwordsNotSame: boolean = false;
  sthWentWrong: boolean = false;
  passwordResetSuccess: boolean = false;

  constructor(private pwervice: ShowpasswordService, private loadingService: LoadingService, private dataService: GetDataService, private route: ActivatedRoute, private router: Router, private authService: AuthService) { }

  ngOnInit(){
    const token = this.route.snapshot.paramMap.get('token')!;
    sessionStorage.setItem('token', token);
  }


  async changePassword() {
    this.loadingService.setLoading(true);
    this.passwordsNotSame = false;
    this.sthWentWrong = false;
    try {
      const body:ResetPasswordBody = {
        "password1": this.resetPwForm.get('password1')!.value,
        "password2": this.resetPwForm.get('password2')!.value
      }
      await this.dataService.resetPassword(body);
      this.handleSuccess();
    } catch (e: any) {
      this.handleErrors(e);      
    }
    this.loadingService.setLoading(false);
  }

  checkForInput(number: number) {
    if (number == 1) {
      this.inputThere1 = this.pwervice.checkForInput(this.password1);
    } else {
      this.inputThere2 = this.pwervice.checkForInput(this.password2);
    }

  }

  showPw(number: number) {
    if (number == 1) {
      this.passwordShown1 = this.pwervice.showPw(this.passwordShown1, this.password1);
    } else {
      this.passwordShown2 = this.pwervice.showPw(this.passwordShown2, this.password2);
    }
  }

  handleErrors(e: any){
    if(e.message.includes('400')){
      this.passwordsNotSame = true;
    } else{
      this.sthWentWrong = true;
    }
  }

  handleSuccess(){
    this.passwordResetSuccess = true;
    this.authService.logout();
  }
}