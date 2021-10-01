import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccionesDoctoresComponent } from './acciones-doctores.component';

describe('AccionesDoctoresComponent', () => {
  let component: AccionesDoctoresComponent;
  let fixture: ComponentFixture<AccionesDoctoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccionesDoctoresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccionesDoctoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
