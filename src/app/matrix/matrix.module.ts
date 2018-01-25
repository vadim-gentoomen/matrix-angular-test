import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AsyncLocalStorageModule} from 'angular-async-local-storage';

import {LoginService} from './authentication/login.service';
import {LocalStorageService} from './local-storage/local-storage.service';
import {TokenInterceptor} from './authentication/token-interceptor';
import {RegistrationService} from './authentication/registration';
import {RoomService} from './room/room.service';

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
    RoomService,
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
