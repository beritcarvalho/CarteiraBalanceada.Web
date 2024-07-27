import { Component, Input } from '@angular/core';
import { Investimento } from '../../../../../shared/interfaces/investimento';

@Component({
  selector: 'app-sugestao-aporte',
  templateUrl: './sugestao-aporte.component.html',
  styleUrl: './sugestao-aporte.component.scss'
})
export class SugestaoAporteComponent {
  @Input() investimento!: Investimento;
  
}
