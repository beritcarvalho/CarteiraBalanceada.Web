import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtivoComponent } from './ativo.component';

describe('AtivoComponent', () => {
  let component: AtivoComponent;
  let fixture: ComponentFixture<AtivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AtivoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
