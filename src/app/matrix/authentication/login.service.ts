import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import {filter, share, skip} from 'rxjs/operators';
import {AuthenticationTypes, LoginData, LoginSubmitObject} from './authenticion.model';

import {LocalStorageService, LOGIN_DATA} from '../local-storage/local-storage.service';
import {NGXLogger} from 'ngx-logger';
import {LoginUrl} from '../model/urls.model';


@Injectable()
export class LoginService {

  private _loginData$: BehaviorSubject<LoginData> = new BehaviorSubject(null);
  private _loginSubmitObject$: Subject<LoginSubmitObject> = new Subject();

  public loginData$: Observable<LoginData> = this._loginData$.asObservable()
    .pipe(
      share()
    );

  constructor(private _localStorageService: LocalStorageService,
              private _http: HttpClient,
              private _logger: NGXLogger) {

    this._loginSubmitObject$
      .subscribe((loginSubmit: LoginSubmitObject) => {

        this._http.post(`${environment.homeServer}${LoginUrl.Login}`, loginSubmit)
          .subscribe({
            next: (data) => {
              const loginData: LoginData = {
                homeServerUrl: environment.homeServer,
                identityServerUrl: environment.identityServer,
                userId: data['user_id'],
                deviceId: data['device_id'],
                accessToken: data['access_token'],
              };
              this._localStorageService.setItem(LOGIN_DATA, loginData)
                .subscribe(() => {
                  this._loginData$.next(loginData);
                });

            },
            error: (err) => this._logger.error(err)
          });

        });

    this._loginData$
      .pipe(
        filter(data => !data),
        skip(1),
      )
      .subscribe(() => {
        this._http.post(`${environment.homeServer}${LoginUrl.Logout}`, null)
          .subscribe({
            next: () => {
              this._localStorageService.removeItem(LOGIN_DATA);
              this._logger.debug('logout');
            },
            error: (err) => this._logger.error(err)
          });
      });

    // TODO: удалить, когда будет компонент
    this.login({
      type: AuthenticationTypes.Password,
      user: '@vadim:dev-tigase.krtech.ru',
      password: '101212dva'
    });

  }

  /**
   * Выход
   */
  logout(): void {
    this._loginData$.next(null);
  }

  /**
   * Логин
   * @param {LoginSubmitObject} loginSubmitObject
   */
  login(loginSubmitObject: LoginSubmitObject): void {
    this._loginSubmitObject$.next(loginSubmitObject);
  }

}
