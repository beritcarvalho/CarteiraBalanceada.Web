import {Component, Inject, Input, input} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ValidadorEstadoFormulario } from '../../../../../shared/validators/validador-estado-formulario';
import { Investimento } from '../../../../../shared/interfaces/investimento';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-realizar-aporte',
  templateUrl: './realizar-aporte.component.html',
  styleUrl: './realizar-aporte.component.scss'
})

export class RealizarAporteComponent {
  
  investimento!: Investimento;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.investimento = data.investimento;
  }
    
  aporteFormControl = new FormControl('', [Validators.required, Validators.pattern(/^[0-9]+(,[0-9]+)?$/)]);
  matcher = new ValidadorEstadoFormulario();
}