import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RealizadasComponent } from './realizadas.component';

describe('RealizadasComponent', () => {
  let component: RealizadasComponent;
  let fixture: ComponentFixture<RealizadasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RealizadasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RealizadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
