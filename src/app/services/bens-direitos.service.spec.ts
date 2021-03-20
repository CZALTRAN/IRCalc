import { TestBed } from '@angular/core/testing';

import { BensDireitosService } from './bens-direitos.service';

describe('BensDireitosService', () => {
  let service: BensDireitosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BensDireitosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
