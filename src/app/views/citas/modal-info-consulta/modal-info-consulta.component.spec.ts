import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalInfoConsultaComponent } from './modal-info-consulta.component';

describe('ModalInfoConsultaComponent', () => {
  let component: ModalInfoConsultaComponent;
  let fixture: ComponentFixture<ModalInfoConsultaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalInfoConsultaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalInfoConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
