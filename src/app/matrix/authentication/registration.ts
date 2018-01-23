import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {filter, publishReplay, refCount, tap} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {AuthenticationTypes, LoginData} from './authenticion.model';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import {Subject} from 'rxjs/Subject';
import {LocalStorageService, LOGIN_DATA} from '../local-storage/local-storage.service';
import {NGXLogger} from 'ngx-logger';

@Injectable()
export class RegistrationService {

  private _loginData$: Subject<LoginData> = new Subject();

  public loginData$: Observable<LoginData> = this._loginData$.asObservable()
    .pipe(
      publishReplay(1),
      refCount());


  constructor(private _localStorageService: LocalStorageService,
              private _http: HttpClient,
              private logger: NGXLogger) {

    // const userPass = {
    //   type: AuthenticationTypes.Password,
    //   user: '@vadim_dynnik:dev-tigase.krtech.ru',
    //   password: '101212dva'
    // };

    // this._http.post(`${environment.homeServer}/_matrix/client/r0/login`, userPass)
    //   .subscribe({
    //     next: (data) => {
    //       const loginData: LoginData = {
    //         homeServerUrl: environment.homeServer,
    //         identityServerUrl: environment.identityServer,
    //         userId: data['user_id'],
    //         deviceId: data['device_id'],
    //         accessToken: data['access_token'],
    //       };
    //       this._localStorageService.setItem(LOGIN_DATA, loginData)
    //         .pipe(tap(login => this.logger.debug(login)))
    //         .subscribe(this._loginData$);
    //
    //     },
    //     error: (err) => console.error(err)
    //   });
  }

}
