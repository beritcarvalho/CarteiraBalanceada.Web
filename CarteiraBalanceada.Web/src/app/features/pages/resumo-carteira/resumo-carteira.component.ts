import { Component, OnInit } from '@angular/core';
import { UtilitariosService } from '../../../shared/services/utilitarios.service';
import { Carteira } from '../../../shared/interfaces/carteira';
import { Investimento } from '../../../shared/interfaces/investimento';
import { catchError, empty, finalize } from 'rxjs';

@Component({
  selector: 'app-resumo-carteira',
  templateUrl: './resumo-carteira.component.html',
  styleUrl: './resumo-carteira.component.scss'
})
export class ResumoCarteiraComponent {

  constructor(private utilitariosService: UtilitariosService
  ) { }

  public carteira: Carteira | null = null;
  public investimentos!: Investimento[];
  public mostrar = false;

  ngOnInit(): void {
    this.observarCarteiraSelecionada();
  }

  private observarCarteiraSelecionada(): void{
    this.utilitariosService.observarCarteiraSelecionada().subscribe(carteiraSelecionada => {
      if(carteiraSelecionada) {
        this.carteira = carteiraSelecionada
      } else {
        this.carteira = null
      }
    });
  }
}
