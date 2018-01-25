import { Component } from '@angular/core';
import {LoginService} from './matrix/authentication/login.service';
import {Observable} from 'rxjs/Observable';
import {RoomService} from './matrix/room/room.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  data1: Observable<any>;
  data2: Observable<any>;

  constructor(private loginService: LoginService,
              private roomService: RoomService) {
    this.data1 = this.loginService.loginData$;
    this.data2 = this.roomService.room$;
  }

  logout() {
    this.loginService.logout();
  }
}
