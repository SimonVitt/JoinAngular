import { Component, ErrorHandler, Inject } from '@angular/core';
import { GlobalErrorHandlerService } from './services/global-error-handler.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'joinA';

  showError: boolean = false;
  errorMsg: string | undefined;

  constructor(@Inject(ErrorHandler)private errorHandler: GlobalErrorHandlerService){
  }

  ngOnInit(){
    this.errorHandler.showError.subscribe((msg: string) => {
      this.errorMsg = msg;
      this.showError =true;
    });
  }
}
