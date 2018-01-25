import {Injectable, Injector} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {LoginService} from './login.service';
import {LoginData} from './authenticion.model';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private _loginData: LoginData;

  constructor(private injector: Injector) {
    setTimeout(() => {
      this.injector.get(LoginService).loginData$
        .subscribe((loginData: LoginData) => this._loginData = loginData);
    });
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this._loginData && this._loginData.accessToken) {
      request = request.clone({params: request.params.set('access_token', this._loginData.accessToken)});
    }
    return next.handle(request);
  }
}
