import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilitariosService {
  private loadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public loadingObservavel: Observable<boolean> = this.loadingSubject.asObservable();

  constructor() { }
  
  public setLoading(loading: boolean): void {
    this.loadingSubject.next(loading);
  }
}
