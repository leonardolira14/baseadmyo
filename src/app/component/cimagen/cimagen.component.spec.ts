import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CimagenComponent } from './cimagen.component';

describe('CimagenComponent', () => {
  let component: CimagenComponent;
  let fixture: ComponentFixture<CimagenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CimagenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CimagenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
