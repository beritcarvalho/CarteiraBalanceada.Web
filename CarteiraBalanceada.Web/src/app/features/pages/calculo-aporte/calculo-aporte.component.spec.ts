import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculoAporteComponent } from './calculo-aporte.component';

describe('CalculoAporteComponent', () => {
  let component: CalculoAporteComponent;
  let fixture: ComponentFixture<CalculoAporteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CalculoAporteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalculoAporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
