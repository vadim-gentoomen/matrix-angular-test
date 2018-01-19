import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { ServiceWorkerModule } from '@angular/service-worker';
import { AppComponent } from './app.component';

import { environment } from '../environments/environment';
import {MatrixClientService} from './matrix-client/matrix-client.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [MatrixClientService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private _matrixClientService: MatrixClientService) {
  }
}
