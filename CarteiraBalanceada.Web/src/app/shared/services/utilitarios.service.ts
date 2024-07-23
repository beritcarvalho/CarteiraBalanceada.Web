import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilitariosService {
  private loadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public loadingObservavel: Observable<boolean> = this.loadingSubject.asObservable();

  constructor(private _snackBar: MatSnackBar) { }

  public setLoading(loading: boolean): void {
    this.loadingSubject.next(loading);
  }

  public mostrarNotificacaoInformacao(mensagem: string): void {
    this._snackBar.open(mensagem, 'Dispensar', {
      duration: 10000,
      panelClass: ['mensagem-informacao'],
      horizontalPosition: 'right'
    });
  }

  public mostrarNotificacaoSucesso(mensagem: string): void {
    this._snackBar.open(mensagem, 'Dispensar', {
      duration: 10000,
      panelClass: ['mensagem-sucesso'],
      horizontalPosition: 'right'
    });
  }

  public mostrarNotificacaoErro(error: any): void {
    const errorMessage = error?.message || "Ocorreu um erro inesperado!";
    this._snackBar.open(error, 'Dispensar', {
      duration: 10000,
      panelClass: ['mensagem-erro'],
      horizontalPosition: 'right'
    });
  }
}
