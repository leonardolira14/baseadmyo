import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CdetalleiamgenComponent } from './cdetalleiamgen.component';

describe('CdetalleiamgenComponent', () => {
  let component: CdetalleiamgenComponent;
  let fixture: ComponentFixture<CdetalleiamgenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CdetalleiamgenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CdetalleiamgenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
