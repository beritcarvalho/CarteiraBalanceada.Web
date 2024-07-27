import { Component, OnInit } from '@angular/core';
import { UtilitariosService } from '../../../shared/services/utilitarios.service';
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
  public carteira!: Carteira | null;
  public carregarInvestimentos: boolean = false

  constructor(private utilitariosService: UtilitariosService,
    private iconRegistry: MatIconRegistry, 
    private sanitizer: DomSanitizer
  ) { 
    iconRegistry.addSvgIcon('calculate', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/calculate.svg'));
  }
  ngOnInit(): void {
    this.observarCarteiraSelecionada();
  }

  private observarCarteiraSelecionada(): void{
    this.utilitariosService.observarCarteiraSelecionada().subscribe(carteiraSelecionada => {
      this.carregarInvestimentos = false;
      if(carteiraSelecionada) {
        this.carteira = carteiraSelecionada;
        this.carregarInvestimentos = this.carteira?.investimentos?.length > 0;        
      } else {
        this.carteira = null        
      }
    });
  }

  private distribuirAporte(id: string, aporte: number) {
    // this.carteiraService.distribuirAporte(id, aporte).subscribe((resultado) => {
    //   this.investimentos = resultado?.investimentos;
    // });
  } 



}
