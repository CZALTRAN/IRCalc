import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BensDireitosComponent } from './bens-direitos.component';

describe('BensDireitosComponent', () => {
  let component: BensDireitosComponent;
  let fixture: ComponentFixture<BensDireitosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BensDireitosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BensDireitosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
