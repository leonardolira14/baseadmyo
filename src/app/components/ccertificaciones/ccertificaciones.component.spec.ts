import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CcertificacionesComponent } from './ccertificaciones.component';

describe('CcertificacionesComponent', () => {
  let component: CcertificacionesComponent;
  let fixture: ComponentFixture<CcertificacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CcertificacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CcertificacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
