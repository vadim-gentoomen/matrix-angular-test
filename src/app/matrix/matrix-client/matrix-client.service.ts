import {Injectable} from '@angular/core';
import * as Matrix from 'matrix-js-sdk';
import {Observable} from 'rxjs/Observable';
import {filter, publishReplay, refCount, tap} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {LoginData} from './models/matrix.model';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import {Subject} from 'rxjs/Subject';
import {LocalStorageService, LOGIN_DATA} from '../local-storage.service';

@Injectable()
export class MatrixClientService {

  matrixClient: Matrix.MatrixClient;

  private _loginData$: Subject<LoginData> = new Subject();

  public loginData$: Observable<LoginData> = this._loginData$.asObservable()
    .pipe(
      filter(data => !!data),
      publishReplay(1),
      refCount());


  constructor(private _localStorageService: LocalStorageService) {
    this.matrixClient = this._createTemporaryClient();

    Observable.fromPromise(this.matrixClient.loginWithPassword('@vadim_dynnik:dev-tigase.krtech.ru', '101212dva'))
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
            .subscribe(this._loginData$);

        },
        error: (err) => console.error(err)
      });
  }

  _createTemporaryClient() {
    return Matrix.createClient({
      baseUrl: environment.homeServer,
      idBaseUrl: environment.identityServer,
    });
  }

}
