import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuaComponent } from './menua.component';

describe('MenuaComponent', () => {
  let component: MenuaComponent;
  let fixture: ComponentFixture<MenuaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
