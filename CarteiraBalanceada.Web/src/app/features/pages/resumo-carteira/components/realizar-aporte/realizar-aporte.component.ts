import { Component, Inject, Input, input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ValidadorEstadoFormulario } from '../../../../../shared/validators/validador-estado-formulario';
import { Investimento } from '../../../../../shared/interfaces/investimento';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UtilitariosService } from '../../../../../shared/services/utilitarios.service';
import { catchError, empty, finalize } from 'rxjs';
import { Carteira } from '../../../../../shared/interfaces/carteira';
import { CarteiraService } from '../../../../../shared/services/carteira.service';

@Component({
  selector: 'app-realizar-aporte',
  templateUrl: './realizar-aporte.component.html',
  styleUrl: './realizar-aporte.component.scss'
})

export class RealizarAporteComponent implements OnInit{
  idCarteira!: string;
  investimento!: Investimento;
  aporteFormControl = new FormControl('', [Validators.required, Validators.pattern(/^[0-9]+(,[0-9]+)?$/)]);

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  private utilitariosService: UtilitariosService,
  private carteiraSevice: CarteiraService
  ) {
    this.investimento = data.investimento;
  }
  ngOnInit(): void {
    this.observarCarteiraSelecionada();
  }

  matcher = new ValidadorEstadoFormulario();

  public aportar(): void {
    const aporte: number = 1000;
    const id: string = this.investimento?.id;
    if (this.investimento?.id) {      
      this.utilitariosService.setLoading(true);
      this.carteiraSevice.aportarInvestimento(id, aporte).pipe(
        catchError(error => {          
          this.utilitariosService.mostrarNotificacaoErro(error?.message)
          return empty();
        }),
        finalize(() => {
          this.utilitariosService.setLoading(false);          
        })
      ).subscribe(() => {
        this.utilitariosService.mostrarNotificacaoSucesso("Aporte realizado com Sucesso!");
        if (this.idCarteira) {
          this.carteiraSevice.distribuirAporte(this.idCarteira, 0);          
        } 
      });
    }
    else {
      this.utilitariosService.notificarAlteracaoIdCarteira(null);
    }
  }

  private observarCarteiraSelecionada(): void{
    this.utilitariosService.observarCarteiraSelecionada().subscribe(carteiraSelecionada => {
      if(carteiraSelecionada) {
        this.idCarteira = carteiraSelecionada.id
      }
    });
  }
}