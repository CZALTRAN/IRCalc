import { TestBed } from '@angular/core/testing';

import { OperacoesComunsService } from './operacoes-comuns.service';

describe('OperacoesComunsService', () => {
  let service: OperacoesComunsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OperacoesComunsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
