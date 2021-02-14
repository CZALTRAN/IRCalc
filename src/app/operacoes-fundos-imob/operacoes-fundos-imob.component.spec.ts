import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperacoesFundosImobComponent } from './operacoes-fundos-imob.component';

describe('OperacoesFundosImobComponent', () => {
  let component: OperacoesFundosImobComponent;
  let fixture: ComponentFixture<OperacoesFundosImobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperacoesFundosImobComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OperacoesFundosImobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
