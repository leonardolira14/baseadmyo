import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FotteraComponent } from './fottera.component';

describe('FotteraComponent', () => {
  let component: FotteraComponent;
  let fixture: ComponentFixture<FotteraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FotteraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FotteraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
