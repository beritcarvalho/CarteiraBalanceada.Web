import { Component } from '@angular/core';
import { UtilitariosService } from '../../../shared/services/utilitarios.service';

@Component({
  selector: 'app-calculo-aporte',
  templateUrl: './calculo-aporte.component.html',
  styleUrl: './calculo-aporte.component.scss'
})
export class CalculoAporteComponent {

  constructor(private service: UtilitariosService) {}
  
  mostrar(){
    let id = ''
    this.service.idCarteiraSelecionadaObservavel.subscribe((idObser) => id = idObser)
    console.log(id)
  }
}
