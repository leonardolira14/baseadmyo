import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagesplanesComponent } from './pagesplanes.component';

describe('PagesplanesComponent', () => {
  let component: PagesplanesComponent;
  let fixture: ComponentFixture<PagesplanesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagesplanesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagesplanesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
