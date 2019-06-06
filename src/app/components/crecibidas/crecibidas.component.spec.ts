import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrecibidasComponent } from './crecibidas.component';

describe('CrecibidasComponent', () => {
  let component: CrecibidasComponent;
  let fixture: ComponentFixture<CrecibidasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrecibidasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrecibidasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
