import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PimagenComponent } from './pimagen.component';

describe('PimagenComponent', () => {
  let component: PimagenComponent;
  let fixture: ComponentFixture<PimagenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PimagenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PimagenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
