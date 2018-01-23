import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {AsyncLocalStorageModule} from 'angular-async-local-storage';

import {LoginService} from './authentication/login';
import {LocalStorageService} from './local-storage/local-storage.service';
import {TokenInterceptor} from './authentication/token-interceptor';
import {RegistrationService} from './authentication/registration';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    AsyncLocalStorageModule,
  ],
  declarations: [],
  providers: [
    LoginService,
    RegistrationService,
    LocalStorageService,
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}
  ],
})
export class MatrixModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: MatrixModule,
      providers: [LoginService],
    };
  }
}
