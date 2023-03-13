import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AllboardsModule } from './allboards/allboards.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoardModule } from './board/board.module';
import { LoginModule } from './login/login.module';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { NetworkerrorComponent } from './global/networkerror/networkerror.component';
import { GlobalErrorHandlerService } from './services/global-error-handler.service';

@NgModule({
  declarations: [
    AppComponent,
    NetworkerrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginModule,
    AllboardsModule,
    BoardModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
     },
     {
      provide: ErrorHandler,
      useClass: GlobalErrorHandlerService
     }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
