import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CdatostelefonosComponent } from './cdatostelefonos.component';

describe('CdatostelefonosComponent', () => {
  let component: CdatostelefonosComponent;
  let fixture: ComponentFixture<CdatostelefonosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CdatostelefonosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CdatostelefonosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
