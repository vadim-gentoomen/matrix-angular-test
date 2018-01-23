import { Component } from '@angular/core';
import {LoginService} from './matrix/authentication/login';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  data: Observable<any>;

  constructor(private loginService: LoginService) {
    this.data = this.loginService.loginData$;
  }

  logout() {
    this.loginService.logout();
  }
}
