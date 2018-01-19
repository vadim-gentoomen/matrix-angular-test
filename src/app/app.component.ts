import { Component } from '@angular/core';
import {MatrixClientService} from './matrix/matrix-client/matrix-client.service';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  data: Observable<any>;

  constructor(private _matrixClientService: MatrixClientService) {
    this.data = this._matrixClientService.loginData$;
  }
}
