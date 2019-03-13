import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CasociacionesComponent } from './casociaciones.component';

describe('CasociacionesComponent', () => {
  let component: CasociacionesComponent;
  let fixture: ComponentFixture<CasociacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CasociacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CasociacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
