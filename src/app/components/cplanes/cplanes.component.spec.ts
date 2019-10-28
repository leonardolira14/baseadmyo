import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CplanesComponent } from './cplanes.component';

describe('CplanesComponent', () => {
  let component: CplanesComponent;
  let fixture: ComponentFixture<CplanesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CplanesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CplanesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
