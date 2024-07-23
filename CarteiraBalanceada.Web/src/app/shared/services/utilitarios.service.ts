import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable } from 'rxjs';
import { Mensagem } from '../interfaces/mensagem';
import { MensagemComponent } from '../components/mensagem/mensagem.component';

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

  mensagem: Mensagem = {
    message: '',
    error: false
  }

  durationInSeconds = 5;

  openSnackBar() {
    if (this.mensagem) {
      if (this.mensagem.error)
        this.durationInSeconds = 10;

      this._snackBar.openFromComponent(MensagemComponent, {
        duration: this.durationInSeconds * 1000,
      });
    }
  }

  setMensagem(message: string, error: boolean) {    
    this.mensagem.message = message;
    this.mensagem.error = error;
    this.openSnackBar()
  }

  showSuccessNotification(message: string) {    
    this.mensagem.message = message;
    this.mensagem.error = false;
    this.openSnackBar()
  }

  showErrorNotification(error: any): void {
    const errorMessage = error?.error?.errors || "Ocorreu um erro inesperado!";
    this.mensagem.message = errorMessage;
    this.mensagem.error = true;
    this.openSnackBar();
  }  

  getMensagem(): Mensagem {
    return this.mensagem
  }
}
