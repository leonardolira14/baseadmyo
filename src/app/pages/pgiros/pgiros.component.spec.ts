import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PgirosComponent } from './pgiros.component';

describe('PgirosComponent', () => {
  let component: PgirosComponent;
  let fixture: ComponentFixture<PgirosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PgirosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PgirosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
