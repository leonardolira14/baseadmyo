import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Reg3Component } from './reg3.component';

describe('Reg3Component', () => {
  let component: Reg3Component;
  let fixture: ComponentFixture<Reg3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Reg3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Reg3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
