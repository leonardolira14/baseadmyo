import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreciosqvalComponent } from './preciosqval.component';

describe('PreciosqvalComponent', () => {
  let component: PreciosqvalComponent;
  let fixture: ComponentFixture<PreciosqvalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreciosqvalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreciosqvalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
