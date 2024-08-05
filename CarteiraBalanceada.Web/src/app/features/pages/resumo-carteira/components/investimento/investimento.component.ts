import { Component, inject, Input, signal } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Investimento } from '../../../../../shared/interfaces/investimento';
import { RealizarAporteComponent } from '../realizar-aporte/realizar-aporte.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AlterarInvestimentoComponent } from '../alterar-investimento/alterar-investimento.component';
import { CarteiraService } from '../../../../../shared/services/carteira.service';
import { UtilitariosService } from '../../../../../shared/services/utilitarios.service';
import { DialogGeneric } from '../../../../../shared/interfaces/dialog-generic';
import { DialogGenericComponent } from '../../../../../shared/components/dialog-generic/dialog-generic.component';
import { catchError, empty, finalize } from 'rxjs';

@Component({
  selector: 'app-investimento',
  templateUrl: './investimento.component.html',
  styleUrl: './investimento.component.scss'
})
export class InvestimentoComponent {

  @Input() investimento!: Investimento;
  @Input() idCarteiraSelecionada!: string | undefined;
  readonly panelOpenState = signal(false);
  readonly dialog = inject(MatDialog);


  constructor(private carteiraService: CarteiraService,
    private utilitariosService: UtilitariosService,
    iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon('calculate', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/calculate.svg'));
  }

  abrirModalAportar(): void {
    const enterAnimationDuration: string = '100ms';
    const exitAnimationDuration: string = '50ms';

    this.dialog.open(RealizarAporteComponent, {
      width: '500px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: { investimento: this.investimento }
    });
  }

  abrirModalAlteracao(): void {
    const enterAnimationDuration: string = '100ms';
    const exitAnimationDuration: string = '50ms';

    this.dialog.open(AlterarInvestimentoComponent, {
      width: '560px',
      height: '330px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: { investimento: this.investimento }
    });
  }

  desativarInvestimento(): void {

    const enterAnimationDuration: string = '100ms';
    const exitAnimationDuration: string = '50ms';
    const conteudoDialogo: DialogGeneric = {
      titulo: 'Desativar Investimento',
      conteudo: 'Tem certeza que desativar este investimento?'
    }

    const dialogRef = this.dialog.open(DialogGenericComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
      data: conteudoDialogo
    });

    dialogRef.afterClosed().subscribe((result) => {
      const id: string = this.investimento.id || '';
      if (result === true) {
        this.utilitariosService.setLoading(true);
               this.carteiraService.desativarInvestimento(id).pipe(
                 catchError(error => {
                   this.utilitariosService.mostrarNotificacaoErro(error?.message)
                   return empty();
                 }),
                 finalize(() => {
                   this.utilitariosService.setLoading(false);
                 })
               ).subscribe(() => {
                 this.utilitariosService.mostrarNotificacaoSucesso("Desativado com Sucesso!");
                 if (this.idCarteiraSelecionada) {
                   this.carteiraService.recarregarDadosCarteira(this.idCarteiraSelecionada, 0);
                 }
               });
             }
      });

    //   if (this.formulario.valid) {
                                  
    //     const id: string = this.investimento?.id || '';
    //     let nome = this.formulario.get('nome')?.value;
    //     let posicaoAtual = this.formulario.get('posicaoAtual')?.value;
    //     let percentualIdeal = this.formulario.get('percentualIdeal')?.value;
  
    //     posicaoAtual = posicaoAtual.toString().replace(',', '.');
    //     percentualIdeal = percentualIdeal.toString().replace(',', '.');
  
  
    //     const investimentoAtualizado: Investimento = {
    //       id: this.investimento.id,
    //       nome: nome,
    //       posicaoAtual: posicaoAtual,
    //       percentualIdeal: percentualIdeal
    //     }
        
    //     if (investimentoAtualizado?.id) {
    //       this.utilitariosService.setLoading(true);
    //       this.carteiraService.alterarInvestimento(investimentoAtualizado).pipe(
    //         catchError(error => {
    //           this.utilitariosService.mostrarNotificacaoErro(error?.message)
    //           return empty();
    //         }),
    //         finalize(() => {
    //           this.utilitariosService.setLoading(false);
    //           this.dialogRef.close();
    //         })
    //       ).subscribe(() => {
    //         this.utilitariosService.mostrarNotificacaoSucesso("Atualização realizado com Sucesso!");
    //         if (this.idCarteira) {
    //           this.carteiraService.recarregarDadosCarteira(this.idCarteira, 0);
    //         }
    //       });
    //     }
    //   }
    

    // if (this.investimento?.id)
    //   this.carteiraService.desativarInvestimento(this.investimento.id);
  }
}
