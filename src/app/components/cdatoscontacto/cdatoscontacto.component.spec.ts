import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CdatoscontactoComponent } from './cdatoscontacto.component';

describe('CdatoscontactoComponent', () => {
  let component: CdatoscontactoComponent;
  let fixture: ComponentFixture<CdatoscontactoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CdatoscontactoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CdatoscontactoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
