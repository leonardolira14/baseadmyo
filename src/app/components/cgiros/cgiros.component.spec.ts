import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CgirosComponent } from './cgiros.component';

describe('CgirosComponent', () => {
  let component: CgirosComponent;
  let fixture: ComponentFixture<CgirosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CgirosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CgirosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
