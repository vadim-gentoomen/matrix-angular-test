import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatrixClientService} from './matrix-client/matrix-client.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [],
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
