import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AsyncLocalStorageModule} from 'angular-async-local-storage';

import {MatrixClientService} from './matrix-client/matrix-client.service';
import {LocalStorageService} from './local-storage.service';

@NgModule({
  imports: [
    CommonModule,
    AsyncLocalStorageModule,
  ],
  declarations: [],
  providers: [LocalStorageService],
})
export class MatrixModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: MatrixModule,
      providers: [
        MatrixClientService
      ],
    };
  }
}
