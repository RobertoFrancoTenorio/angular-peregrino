import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccionesUsuariosComponent } from './acciones-usuarios.component';

describe('AccionesUsuariosComponent', () => {
  let component: AccionesUsuariosComponent;
  let fixture: ComponentFixture<AccionesUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccionesUsuariosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccionesUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
