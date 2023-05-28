import { Component, ErrorHandler, Inject } from '@angular/core';
import { GlobalErrorHandlerService } from './services/global-error-handler.service';
import { LoadingService } from './services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Join';

  showError: boolean = false;
  loading: boolean = false;
  errorMsg: string | undefined;

  constructor(@Inject(ErrorHandler)private errorHandler: GlobalErrorHandlerService, private loadingService: LoadingService){
  }

  ngOnInit(){
    this.errorHandler.showError.subscribe((msg: string) => {
      this.errorMsg = msg;
      this.showError =true;
    });
    this.loadingService.loadingSubject.subscribe((loading: boolean) => {
      this.loading = loading;
    })
  }
}
