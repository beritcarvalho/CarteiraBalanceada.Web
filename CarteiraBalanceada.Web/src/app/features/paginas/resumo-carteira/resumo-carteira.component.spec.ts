import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumoCarteiraComponent } from './resumo-carteira.component';

describe('ResumoCarteiraComponent', () => {
  let component: ResumoCarteiraComponent;
  let fixture: ComponentFixture<ResumoCarteiraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResumoCarteiraComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResumoCarteiraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
