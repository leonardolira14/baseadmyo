import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CdatospagoComponent } from './cdatospago.component';

describe('CdatospagoComponent', () => {
  let component: CdatospagoComponent;
  let fixture: ComponentFixture<CdatospagoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CdatospagoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CdatospagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
