import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditPacComponent } from './modal-edit-pac.component';

describe('ModalEditPacComponent', () => {
  let component: ModalEditPacComponent;
  let fixture: ComponentFixture<ModalEditPacComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEditPacComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEditPacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
