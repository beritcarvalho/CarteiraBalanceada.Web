import { Component, OnInit } from '@angular/core';
import { UtilitariosService } from '../../../shared/services/utilitarios.service';
import { CarteiraService } from '../../services/carteira.service';
import { Investimento } from '../../../shared/interfaces/investimento';
import { Carteira } from '../../../shared/interfaces/carteira';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-calculo-aporte',
  templateUrl: './calculo-aporte.component.html',
  styleUrl: './calculo-aporte.component.scss'
})
export class CalculoAporteComponent implements OnInit {
  public carteira!: Carteira;
  public investimentos!: Investimento[];

  constructor(private utilitarioService: UtilitariosService,
    private carteiraService: CarteiraService,
    private iconRegistry: MatIconRegistry, 
    private sanitizer: DomSanitizer
  ) { 
    iconRegistry.addSvgIcon('calculate', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/calculate.svg'));
  }
  ngOnInit(): void {
    this.utilitarioService.observarAlteracao().subscribe(id => {
      this.distribuirAporte(id, 0);
    });
  }

  private distribuirAporte(id: string, aporte: number) {
    this.carteiraService.distribuirAporte(id, aporte).subscribe((resultado) => {
      this.carteira = resultado;
      console.log(this.carteira)
      this.investimentos = resultado?.investimentos;
      console.log(this.investimentos)
    });
  }

  mostrar() {
    let id = ''
    this.utilitarioService.idCarteiraSelecionadaObservavel.subscribe((idObser) => id = idObser)
    console.log(id)
  }


}
