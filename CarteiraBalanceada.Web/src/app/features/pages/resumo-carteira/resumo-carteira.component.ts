import { Component, OnInit } from '@angular/core';
import { UtilitariosService } from '../../../shared/services/utilitarios.service';
import { Carteira } from '../../../shared/interfaces/carteira';
import { CarteiraService } from '../../services/carteira.service';
import { Investimento } from '../../../shared/interfaces/investimento';

@Component({
  selector: 'app-resumo-carteira',
  templateUrl: './resumo-carteira.component.html',
  styleUrl: './resumo-carteira.component.scss'
})
export class ResumoCarteiraComponent { 

  constructor(private utilitarioService: UtilitariosService,
    private carteiraService: CarteiraService
  ) {}

  public carteira!: Carteira;
  public investimentos!: Investimento[]; 

  ngOnInit(): void {
    this.utilitarioService.observarAlteracao().subscribe(id => {        
      this.carteiraService.obterCarteiraPorId(id).subscribe((resultado) => {
        this.carteira = resultado;
        this.investimentos = resultado?.investimentos
      })
    });    
  }  
}
