import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AllboardsModule } from './allboards/allboards.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginModule } from './login/login.module';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { NetworkerrorComponent } from './global/networkerror/networkerror.component';
import { GlobalErrorHandlerService } from './services/global-error-handler.service';
import { LoadingComponent } from './global/loading/loading.component';

@NgModule({
  declarations: [
    AppComponent,
    NetworkerrorComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginModule,
    AllboardsModule,
    HttpClientModule
  ],
  providers: [
    {
     provide: ErrorHandler,
     useClass: GlobalErrorHandlerService
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
     }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
