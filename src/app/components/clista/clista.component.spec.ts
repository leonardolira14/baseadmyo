import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClistaComponent } from './clista.component';

describe('ClistaComponent', () => {
  let component: ClistaComponent;
  let fixture: ComponentFixture<ClistaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClistaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
