import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CdetallesriesgoComponent } from './cdetallesriesgo.component';

describe('CdetallesriesgoComponent', () => {
  let component: CdetallesriesgoComponent;
  let fixture: ComponentFixture<CdetallesriesgoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CdetallesriesgoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CdetallesriesgoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
