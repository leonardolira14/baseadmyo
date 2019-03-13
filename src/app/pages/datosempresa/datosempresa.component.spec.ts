import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosempresaComponent } from './datosempresa.component';

describe('DatosempresaComponent', () => {
  let component: DatosempresaComponent;
  let fixture: ComponentFixture<DatosempresaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatosempresaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosempresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
