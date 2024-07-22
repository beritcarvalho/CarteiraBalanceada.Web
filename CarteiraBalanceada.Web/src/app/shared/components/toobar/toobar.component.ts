import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Carteira } from '../../interfaces/Carteira';
import { DadosService } from '../../../core/services/dados.service';
import { catchError, empty, finalize } from 'rxjs';
import { UtilitariosService } from '../../services/utilitarios.service';

@Component({
  selector: 'app-toobar',
  templateUrl: './toobar.component.html',
  styleUrl: './toobar.component.scss'
})
export class ToobarComponent implements OnInit {
  public loading: boolean = false;
  
  
  public botaoSelecionado: number = 0;
  public carteiras: Carteira[] = [];

  constructor(private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    private router: Router,
    private dadosService: DadosService,
    private utilitariosService: UtilitariosService
  ) {
    iconRegistry.addSvgIcon('wallet', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/wallet.svg'));
  }
  ngOnInit(): void {
    this.ObservarStatusLoading();
    this.obterCarteiras();
  }

  private ObservarStatusLoading(): void {
    this.utilitariosService.loadingObservavel.subscribe((loading) => this.loading = loading
    );
  }

  private obterCarteiras(): void {
    this.utilitariosService.setLoading(true);
    this.dadosService.listarCarteiras().pipe(
      catchError(error => {
        console.error('Erro:', error);
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

 
}
