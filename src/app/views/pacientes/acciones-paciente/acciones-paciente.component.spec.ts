import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccionesPacienteComponent } from './acciones-paciente.component';

describe('AccionesPacienteComponent', () => {
  let component: AccionesPacienteComponent;
  let fixture: ComponentFixture<AccionesPacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccionesPacienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccionesPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
