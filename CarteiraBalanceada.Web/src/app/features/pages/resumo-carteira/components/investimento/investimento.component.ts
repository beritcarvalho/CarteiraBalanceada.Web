import { ChangeDetectionStrategy, Component, Input, signal } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Investimento } from '../../../../../shared/interfaces/investimento';

@Component({
  selector: 'app-investimento',
  templateUrl: './investimento.component.html',
  styleUrl: './investimento.component.scss'
})
export class InvestimentoComponent {

  @Input() investimento!: Investimento;  

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon('calculate', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/calculate.svg'));
  }

  readonly panelOpenState = signal(false);
}
