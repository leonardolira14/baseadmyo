import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClistausuariosComponent } from './clistausuarios.component';

describe('ClistausuariosComponent', () => {
  let component: ClistausuariosComponent;
  let fixture: ComponentFixture<ClistausuariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClistausuariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClistausuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
