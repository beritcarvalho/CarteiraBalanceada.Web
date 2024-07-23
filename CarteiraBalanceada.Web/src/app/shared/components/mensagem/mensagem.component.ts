import { Component, inject } from '@angular/core';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { UtilitariosService } from '../../services/utilitarios.service';
import { Mensagem } from '../../interfaces/mensagem';

@Component({
  selector: 'app-mensagem',
  standalone: true,
  imports: [],
  templateUrl: './mensagem.component.html',
  styleUrl: './mensagem.component.scss'
})
export class MensagemComponent {
  durationInSeconds = 5;

  constructor(private utilitariosService: UtilitariosService) {}

  mensagem!: Mensagem;
  snackBarRef = inject(MatSnackBarRef);

  ngOnInit(): void {
    this.setMensagem();
  }

  setMensagem() {
    this.mensagem = this.utilitariosService.getMensagem();    
  }

  obterClass(): string{
    if(this.mensagem.error){
      return 'error';
    }

    return 'success';
  }

}
