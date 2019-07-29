import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PnotificacionesComponent } from './pnotificaciones.component';

describe('PnotificacionesComponent', () => {
  let component: PnotificacionesComponent;
  let fixture: ComponentFixture<PnotificacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PnotificacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PnotificacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
