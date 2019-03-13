import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CfollowComponent } from './cfollow.component';

describe('CfollowComponent', () => {
  let component: CfollowComponent;
  let fixture: ComponentFixture<CfollowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CfollowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CfollowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
