import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperacoesComunsComponent } from './operacoes-comuns.component';

describe('OperacoesComunsDTradeComponent', () => {
  let component: OperacoesComunsComponent;
  let fixture: ComponentFixture<OperacoesComunsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperacoesComunsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OperacoesComunsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
