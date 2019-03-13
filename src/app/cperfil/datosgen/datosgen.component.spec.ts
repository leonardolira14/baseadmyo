import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosgenComponent } from './datosgen.component';

describe('DatosgenComponent', () => {
  let component: DatosgenComponent;
  let fixture: ComponentFixture<DatosgenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatosgenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosgenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
