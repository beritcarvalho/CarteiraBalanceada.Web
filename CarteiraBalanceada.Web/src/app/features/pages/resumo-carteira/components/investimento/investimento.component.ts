import { Component, inject, Input, signal } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Investimento } from '../../../../../shared/interfaces/investimento';
import { RealizarAporteComponent } from '../realizar-aporte/realizar-aporte.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

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
  
  openDialog(): void {
    const enterAnimationDuration: string = '100ms';
    const exitAnimationDuration: string = '50ms';

    this.dialog.open(RealizarAporteComponent, {
      width: '500px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: { investimento: this.investimento }
    });
  }
}
