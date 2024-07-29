import { Component, OnInit } from '@angular/core';
import { UtilitariosService } from '../../../shared/services/utilitarios.service';
import { Investimento } from '../../../shared/interfaces/investimento';
import { Carteira } from '../../../shared/interfaces/carteira';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CarteiraService } from '../../../shared/services/carteira.service';
import id from '@angular/common/locales/id';

@Component({
  selector: 'app-calculo-aporte',
  templateUrl: './calculo-aporte.component.html',
  styleUrl: './calculo-aporte.component.scss'
})
export class CalculoAporteComponent implements OnInit {
  public carteira!: Carteira | null;
  public carregarInvestimentos: boolean = false;
  public formulario!: FormGroup;
  public aporte = new FormControl<string>('');
  public valido = false;

  constructor(private utilitariosService: UtilitariosService,
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    private formBuilder: FormBuilder,
    private carteiraService: CarteiraService
  ) {
    iconRegistry.addSvgIcon('calculate', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/calculate.svg'));
  }
  ngOnInit(): void {
    this.observarCarteiraSelecionada();
    this.construirFormulario();
  }

  private observarCarteiraSelecionada(): void {
    this.utilitariosService.observarCarteiraSelecionada().subscribe(carteiraSelecionada => {
      this.carregarInvestimentos = false;
      if (carteiraSelecionada) {
        this.carteira = carteiraSelecionada;
        this.carregarInvestimentos = this.carteira?.investimentos?.length > 0;
      } else {
        this.carteira = null
      }
    });
  }

  public distribuirAporte() {
    if (this.formulario.valid) {

      
      let input = this.formulario.get('aporte')?.value;
      input = input.replace(',', '.');

      const aporte = Number(input);



      if(this.carteira?.id)
        this.carteiraService.distribuirAporte(this.carteira.id, aporte)
    }
  }

  private construirFormulario() {
    this.formulario = this.formBuilder.group({
      aporte: ['', Validators.compose([
        Validators.required,
        Validators.pattern(/^[0-9]+(,[0-9]+)?$/)
      ])]
    });
  }
}
