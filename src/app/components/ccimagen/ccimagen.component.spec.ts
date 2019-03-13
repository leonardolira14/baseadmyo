import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CcimagenComponent } from './ccimagen.component';

describe('CcimagenComponent', () => {
  let component: CcimagenComponent;
  let fixture: ComponentFixture<CcimagenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CcimagenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CcimagenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
