import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageplanesComponent } from './pageplanes.component';

describe('PageplanesComponent', () => {
  let component: PageplanesComponent;
  let fixture: ComponentFixture<PageplanesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageplanesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageplanesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
