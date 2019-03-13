import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Reg1Component } from './reg1.component';

describe('Reg1Component', () => {
  let component: Reg1Component;
  let fixture: ComponentFixture<Reg1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Reg1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Reg1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
