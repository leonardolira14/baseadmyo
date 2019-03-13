import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrealizadasComponent } from './crealizadas.component';

describe('CrealizadasComponent', () => {
  let component: CrealizadasComponent;
  let fixture: ComponentFixture<CrealizadasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrealizadasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrealizadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
