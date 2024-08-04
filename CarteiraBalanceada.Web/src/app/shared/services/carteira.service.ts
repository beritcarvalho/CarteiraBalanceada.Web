import { Injectable } from '@angular/core';
import { HttpService } from '../../shared/services/http.service';
import { environment } from '../../../environments/environment';
import { HttpParams } from '@angular/common/http';
import { catchError, empty, finalize, Observable } from 'rxjs';
import { Carteira } from '../../shared/interfaces/carteira';
import { Aporte } from '../../shared/interfaces/aporte-input';
import { UtilitariosService } from './utilitarios.service';
import { Investimento } from '../interfaces/investimento';

export interface Teste {
  nomeCarteira: string;
  aporte: number
}
@Injectable({
  providedIn: 'root'
})
export class CarteiraService {
  private urlApi: string = environment.carteiraBalanceadaApi.url + environment.carteiraBalanceadaApi.route.carteiras;

  constructor(private service: HttpService,
    private utilitariosService: UtilitariosService
  ) { }

  public obterCarteiraPorId(id: string): Observable<Carteira> {
    return this.service.http.get<Carteira>(`${this.urlApi}/${id}`);
  }

  private calcularDistribuicaoAporte(id: string, aporte: number): Observable<Carteira> {
    const parametro: Aporte = {
      id: id,
      aporte: aporte
    }

    return this.service.http.post<Carteira>(`${this.urlApi}/calcular-aporte-distribuido`, parametro);
  }

  public aportarInvestimento(idInvestimento: string, aporte: number): Observable<Investimento> {
    const parametro: Aporte = {
      id: idInvestimento,
      aporte: aporte
    }

    return this.service.http.post<Investimento>(`${this.urlApi}/investimentos/aportar`, parametro);
  }

  public alterarInvestimento(investimento: Investimento): Observable<Investimento> { 
    return this.service.http.put<Investimento>(`${this.urlApi}/investimentos`, investimento);
  }


  public distribuirAporte(id: string, aporte: number): void {
    let carteiraSelecionada: Carteira | null = null;

    if (id) {      
      this.utilitariosService.setLoading(true);
      this.calcularDistribuicaoAporte(id, aporte).pipe(
        catchError(error => {
          carteiraSelecionada = null;
          this.utilitariosService.mostrarNotificacaoErro(error?.message)
          return empty();
        }),
        finalize(() => {
          this.utilitariosService.setLoading(false);
          this.utilitariosService.notificarAlteracaoIdCarteira(carteiraSelecionada);          
        })
      ).subscribe(resultado => {
        if (resultado) {
          carteiraSelecionada = resultado;
        } else {
          carteiraSelecionada = null;
        }
      });
    }
    else {
      this.utilitariosService.notificarAlteracaoIdCarteira(null);
    }
  }
}
