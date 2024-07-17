import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';


@Component({
  selector: 'app-ativo',
  templateUrl: './ativo.component.html',
  styleUrl: './ativo.component.css'
})
export class AtivoComponent {
  readonly panelOpenState = signal(false);
}
