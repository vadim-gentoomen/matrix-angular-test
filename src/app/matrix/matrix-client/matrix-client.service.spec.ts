import { TestBed, inject } from '@angular/core/testing';

import { MatrixClientService } from './matrix-client.service';

describe('MatrixClientService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MatrixClientService]
    });
  });

  it('should be created', inject([MatrixClientService], (service: MatrixClientService) => {
    expect(service).toBeTruthy();
  }));
});
