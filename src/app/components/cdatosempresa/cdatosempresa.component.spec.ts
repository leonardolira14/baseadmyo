import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CdatosempresaComponent } from './cdatosempresa.component';

describe('CdatosempresaComponent', () => {
  let component: CdatosempresaComponent;
  let fixture: ComponentFixture<CdatosempresaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CdatosempresaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CdatosempresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
