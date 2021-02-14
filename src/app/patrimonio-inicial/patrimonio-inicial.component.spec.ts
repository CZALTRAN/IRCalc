import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatrimonioInicialComponent } from './patrimonio-inicial.component';

describe('PatrimonioInicialComponent', () => {
  let component: PatrimonioInicialComponent;
  let fixture: ComponentFixture<PatrimonioInicialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatrimonioInicialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatrimonioInicialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
