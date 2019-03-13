import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaqueteqvalComponent } from './paqueteqval.component';

describe('PaqueteqvalComponent', () => {
  let component: PaqueteqvalComponent;
  let fixture: ComponentFixture<PaqueteqvalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaqueteqvalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaqueteqvalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
