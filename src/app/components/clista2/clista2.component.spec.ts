import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Clista2Component } from './clista2.component';

describe('Clista2Component', () => {
  let component: Clista2Component;
  let fixture: ComponentFixture<Clista2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Clista2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Clista2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
