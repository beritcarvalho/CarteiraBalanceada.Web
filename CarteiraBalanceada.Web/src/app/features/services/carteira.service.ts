import { Injectable } from '@angular/core';
import { HttpService } from '../../shared/services/http.service';
import { environment } from '../../../environments/environment';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Carteira } from '../../shared/interfaces/carteira';

@Injectable({
  providedIn: 'root'
})
export class CarteiraService {
  private urlApi: string = environment.carteiraBalanceadaApi.url + environment.carteiraBalanceadaApi.route.carteiras;
  
  constructor(private service: HttpService) { }

  public obterCarteiraPorId(id: string): Observable<Carteira> {    
    return this.service.http.get<Carteira>(`${this.urlApi}/${id}`);
  }
}
