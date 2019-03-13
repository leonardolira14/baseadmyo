import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CdatosusuarioComponent } from './cdatosusuario.component';

describe('CdatosusuarioComponent', () => {
  let component: CdatosusuarioComponent;
  let fixture: ComponentFixture<CdatosusuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CdatosusuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CdatosusuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
