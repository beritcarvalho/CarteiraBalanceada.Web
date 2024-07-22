import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Carteira } from '../../interfaces/Carteira';
import { DadosService } from '../../../core/services/dados.service';
import { catchError, empty, finalize } from 'rxjs';

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
    private dadosService: DadosService
  ) {
    iconRegistry.addSvgIcon('wallet', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/wallet.svg'));
  }
  ngOnInit(): void {
    this.obterCarteiras();
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

  public obterCarteiras() {
    this.loading = true;
    this.dadosService.listarCarteiras().pipe(
      catchError(error => {
        console.error('Erro:', error);
        return empty(); 
      }),
      finalize(() => {
        this.loading = false;
      })
    ).subscribe(resultado => {
      this.carteiras = resultado;
    });    
  }
}
