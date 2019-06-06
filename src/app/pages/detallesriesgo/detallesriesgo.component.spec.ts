import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesriesgoComponent } from './detallesriesgo.component';

describe('DetallesriesgoComponent', () => {
  let component: DetallesriesgoComponent;
  let fixture: ComponentFixture<DetallesriesgoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetallesriesgoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallesriesgoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
