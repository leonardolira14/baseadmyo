import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilbuscadoComponent } from './perfilbuscado.component';

describe('PerfilbuscadoComponent', () => {
  let component: PerfilbuscadoComponent;
  let fixture: ComponentFixture<PerfilbuscadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfilbuscadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilbuscadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
