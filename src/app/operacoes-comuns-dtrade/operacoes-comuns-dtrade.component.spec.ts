import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperacoesComunsDTradeComponent } from './operacoes-comuns-dtrade.component';

describe('OperacoesComunsDTradeComponent', () => {
  let component: OperacoesComunsDTradeComponent;
  let fixture: ComponentFixture<OperacoesComunsDTradeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperacoesComunsDTradeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OperacoesComunsDTradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
