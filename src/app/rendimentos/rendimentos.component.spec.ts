import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RendimentosComponent } from './rendimentos.component';

describe('RendimentosComponent', () => {
  let component: RendimentosComponent;
  let fixture: ComponentFixture<RendimentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RendimentosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RendimentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
