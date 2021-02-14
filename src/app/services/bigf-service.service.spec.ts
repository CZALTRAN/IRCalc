import { TestBed } from '@angular/core/testing';

import { BigfServiceService } from './bigf-service.service';

describe('BigfServiceService', () => {
  let service: BigfServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BigfServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
