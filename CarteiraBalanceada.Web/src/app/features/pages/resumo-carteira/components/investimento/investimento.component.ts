import { Component, inject, Input, signal } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Investimento } from '../../../../../shared/interfaces/investimento';
import { RealizarAporteComponent } from '../realizar-aporte/realizar-aporte.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AlterarInvestimentoComponent } from '../alterar-investimento/alterar-investimento.component';

@Component({
  selector: 'app-investimento',
  templateUrl: './investimento.component.html',
  styleUrl: './investimento.component.scss'
})
export class InvestimentoComponent {

  @Input() investimento!: Investimento;  
  readonly panelOpenState = signal(false);
  readonly dialog = inject(MatDialog);

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon('calculate', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/calculate.svg'));
  }
  
  abrirModalAportar(): void {
    const enterAnimationDuration: string = '100ms';
    const exitAnimationDuration: string = '50ms';

    this.dialog.open(RealizarAporteComponent, {
      width: '500px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: { investimento: this.investimento }
    });
  }

  abrirModalAlteracao(): void {
    const enterAnimationDuration: string = '100ms';
    const exitAnimationDuration: string = '50ms';

    this.dialog.open(AlterarInvestimentoComponent, {
      width: '560px',
      height: '330px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: { investimento: this.investimento }
    });
  }
}
