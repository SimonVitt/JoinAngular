import { ErrorHandler, EventEmitter, Injectable, Output } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class GlobalErrorHandlerService implements ErrorHandler{

  showError = new Subject<string>();
  
  constructor() {}

  handleError(error: Error): void {
    console.log(error)
    this.showError.next(error.name);
  }
}
