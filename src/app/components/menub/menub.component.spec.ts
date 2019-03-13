import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenubComponent } from './menub.component';

describe('MenubComponent', () => {
  let component: MenubComponent;
  let fixture: ComponentFixture<MenubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
