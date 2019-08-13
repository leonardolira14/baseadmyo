import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClistaRiesgoComponent } from './clista-riesgo.component';

describe('ClistaRiesgoComponent', () => {
  let component: ClistaRiesgoComponent;
  let fixture: ComponentFixture<ClistaRiesgoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClistaRiesgoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClistaRiesgoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
