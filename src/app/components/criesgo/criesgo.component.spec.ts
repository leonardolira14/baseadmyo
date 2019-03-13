import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CriesgoComponent } from './criesgo.component';

describe('CriesgoComponent', () => {
  let component: CriesgoComponent;
  let fixture: ComponentFixture<CriesgoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CriesgoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CriesgoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
