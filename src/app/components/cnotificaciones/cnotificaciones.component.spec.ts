import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CnotificacionesComponent } from './cnotificaciones.component';

describe('CnotificacionesComponent', () => {
  let component: CnotificacionesComponent;
  let fixture: ComponentFixture<CnotificacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CnotificacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnotificacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
