import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CbuscarComponent } from './cbuscar.component';

describe('CbuscarComponent', () => {
  let component: CbuscarComponent;
  let fixture: ComponentFixture<CbuscarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CbuscarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CbuscarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
