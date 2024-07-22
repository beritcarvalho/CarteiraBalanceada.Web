import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-investimento',
  templateUrl: './investimento.component.html',
  styleUrl: './investimento.component.scss'
})
export class InvestimentoComponent {
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon('calculate', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/calculate.svg'));
  }

  readonly panelOpenState = signal(false);
}
