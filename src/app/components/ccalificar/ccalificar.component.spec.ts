import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CcalificarComponent } from './ccalificar.component';

describe('CcalificarComponent', () => {
  let component: CcalificarComponent;
  let fixture: ComponentFixture<CcalificarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CcalificarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CcalificarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
