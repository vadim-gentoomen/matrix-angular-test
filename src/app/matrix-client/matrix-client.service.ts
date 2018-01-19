import {Injectable} from '@angular/core';
import * as Matrix from 'matrix-js-sdk';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {publishReplay, refCount} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import * as _ from 'lodash';
import {LoginData} from './models/matrix.model';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class MatrixClientService {

  matrixClient: Matrix.MatrixClient;

  private _loginData$: BehaviorSubject<LoginData> = new BehaviorSubject<LoginData>(null);
  private _publicRooms$: Subject<any> = new Subject();


  public publicRooms$: Observable<any> = this._publicRooms$.asObservable()
    .pipe(publishReplay(1), refCount());

  public loginData$: Observable<LoginData> = this._loginData$.asObservable()
    .pipe(publishReplay(1), refCount());


  constructor() {
    this.matrixClient = this._createTemporaryClient();

    Observable.fromPromise(this.matrixClient.loginWithPassword('@vadim_dynnik:dev-tigase.krtech.ru', '101212dva'))
      .subscribe({
        next: (data) => {
          console.log(data);
          this._loginData$.next(<LoginData> data);
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
