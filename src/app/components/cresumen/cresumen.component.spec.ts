import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CresumenComponent } from './cresumen.component';

describe('CresumenComponent', () => {
  let component: CresumenComponent;
  let fixture: ComponentFixture<CresumenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CresumenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CresumenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
