import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

import {NGXLogger} from 'ngx-logger';
import {CreateRoomSubmit, Room} from './room.model';
import {CreateRoomUrl} from '../model/urls.model';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {publishReplay, refCount} from 'rxjs/operators';

@Injectable()
export class RoomService {

private _room$: Subject<Room> = new Subject<Room>();

public room$: Observable<Room> = this._room$.asObservable()
  .pipe(publishReplay(1), refCount());

  constructor(private _http: HttpClient,
              private _logger: NGXLogger) {

    // const createRoomSubmit: CreateRoomSubmit = {
    //   room_alias_name: 'Test_Room3',
    //   topic: 'All about happy hour',
    //   name: 'Test_Room3'
    // };

    // setTimeout(() => {
    //   this._logger.log('!!!!');
    //   this.createRoom(createRoomSubmit);
    // }, 10000);

  }

  createRoom(createRoomSubmit: CreateRoomSubmit) {
    this._http.post(`${environment.homeServer}${CreateRoomUrl}`, createRoomSubmit)
      .subscribe(data => {
        this._logger.log(data);
        this._room$.next(new Room(data));
      });
  }


}
