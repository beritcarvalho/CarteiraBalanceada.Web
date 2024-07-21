import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-ativo',
  templateUrl: './ativo.component.html',
  styleUrl: './ativo.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AtivoComponent {

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon('calculate', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/calculate.svg'));
  }

  readonly panelOpenState = signal(false);
}
