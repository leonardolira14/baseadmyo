import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaRiesgoComponent } from './lista-riesgo.component';

describe('ListaRiesgoComponent', () => {
  let component: ListaRiesgoComponent;
  let fixture: ComponentFixture<ListaRiesgoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaRiesgoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaRiesgoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
