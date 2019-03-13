import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleimagenComponent } from './detalleimagen.component';

describe('DetalleimagenComponent', () => {
  let component: DetalleimagenComponent;
  let fixture: ComponentFixture<DetalleimagenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleimagenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleimagenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
