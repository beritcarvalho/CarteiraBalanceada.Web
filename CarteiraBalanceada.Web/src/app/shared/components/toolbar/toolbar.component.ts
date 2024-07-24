import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Carteira } from '../../interfaces/carteira';
import { DadosService } from '../../../core/services/dados.service';
import { catchError, empty, finalize } from 'rxjs';
import { UtilitariosService } from '../../services/utilitarios.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatOptionSelectionChange } from '@angular/material/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class toolbarComponent implements OnInit {
  public loading: boolean = false;
  public botaoSelecionado: number = 0;
  public carteiras: Carteira[] = [];

  opcaoSelecionada: any;

  constructor(private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    private router: Router,
    private dadosService: DadosService,
    private utilitariosService: UtilitariosService
  ) {
    iconRegistry.addSvgIcon('wallet', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/wallet.svg'));
  }
  ngOnInit(): void {
    this.observarStatusLoading();
    this.obterCarteiras();
  }

  private observarStatusLoading(): void {
    this.utilitariosService.loadingObservavel.subscribe((loading) => this.loading = loading
    );
  }

  private obterCarteiras(): void {
    this.utilitariosService.setLoading(true);
    this.dadosService.listarCarteiras().pipe(
      catchError(error => {
        this.utilitariosService.mostrarNotificacaoErro(error?.message)
        return empty();
      }),
      finalize(() => {
        this.utilitariosService.setLoading(false);
      })
    ).subscribe(resultado => {
      this.carteiras = resultado;
    });
  }

  public ativarBotao(botao: number): void {
    this.botaoSelecionado = botao;
    if (this.botaoSelecionado == 1) {
      this.router.navigateByUrl('/resumo-carteira');
    }
    else if (this.botaoSelecionado == 2) {
      this.router.navigateByUrl('/calculo-aporte');
    }
  }

  mostrar(evento: MatOptionSelectionChange){
    console.log(evento?.source?.value)
    this.utilitariosService.setIdCarteiraSelecionada(evento?.source?.value)
    console.log(this.opcaoSelecionada)
  }
}
