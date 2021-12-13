import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroPagaComponent } from './registro-paga.component';

describe('RegistroPagaComponent', () => {
  let component: RegistroPagaComponent;
  let fixture: ComponentFixture<RegistroPagaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroPagaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroPagaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
