import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccionesCitaComponent } from './acciones-cita.component';

describe('AccionesCitaComponent', () => {
  let component: AccionesCitaComponent;
  let fixture: ComponentFixture<AccionesCitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccionesCitaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccionesCitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
