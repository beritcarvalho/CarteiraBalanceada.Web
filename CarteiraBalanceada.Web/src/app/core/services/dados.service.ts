import { Injectable } from '@angular/core';
import { Carteira } from '../../shared/interfaces/carteira'
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DadosService {
  private urlApi: string = environment.carteiraBalanceadaApi.url + environment.carteiraBalanceadaApi.route.carteiras;
  constructor(private http: HttpClient) { }

  public listarCarteiras(): Observable<Carteira[]> {
    const parametros = new HttpParams().set('ativo', true);
    return this.http.get<Carteira[]>(this.urlApi, { params: parametros });
  }
}
