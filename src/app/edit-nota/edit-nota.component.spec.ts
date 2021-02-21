import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditNotaComponent } from './edit-nota.component';

describe('EditNotaComponent', () => {
  let component: EditNotaComponent;
  let fixture: ComponentFixture<EditNotaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditNotaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditNotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
