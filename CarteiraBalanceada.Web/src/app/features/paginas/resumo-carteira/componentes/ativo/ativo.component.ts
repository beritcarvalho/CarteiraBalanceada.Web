import { ChangeDetectionStrategy, Component, signal } from '@angular/core';


@Component({
  selector: 'app-ativo',
  templateUrl: './ativo.component.html',
  styleUrl: './ativo.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AtivoComponent {
  readonly panelOpenState = signal(false);
}
