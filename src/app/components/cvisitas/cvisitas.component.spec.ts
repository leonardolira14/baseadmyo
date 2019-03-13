import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CvisitasComponent } from './cvisitas.component';

describe('CvisitasComponent', () => {
  let component: CvisitasComponent;
  let fixture: ComponentFixture<CvisitasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CvisitasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CvisitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
