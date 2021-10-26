import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalInfoPacComponent } from './modal-info-pac.component';

describe('ModalInfoPacComponent', () => {
  let component: ModalInfoPacComponent;
  let fixture: ComponentFixture<ModalInfoPacComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalInfoPacComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalInfoPacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
