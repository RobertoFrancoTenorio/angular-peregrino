import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeredoFamiliaresComponent } from './heredo-familiares.component';

describe('HeredoFamiliaresComponent', () => {
  let component: HeredoFamiliaresComponent;
  let fixture: ComponentFixture<HeredoFamiliaresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeredoFamiliaresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeredoFamiliaresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
