import { Component, Inject } from '@angular/core';
import { Investimento } from '../../../../../shared/interfaces/investimento';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RealizarAporteComponent } from '../realizar-aporte/realizar-aporte.component';
import { UtilitariosService } from '../../../../../shared/services/utilitarios.service';
import { CarteiraService } from '../../../../../shared/services/carteira.service';
import { ValidadorEstadoFormulario } from '../../../../../shared/validators/validador-estado-formulario';
import { catchError, empty, finalize } from 'rxjs';

@Component({
  selector: 'app-alterar-investimento',
  templateUrl: './alterar-investimento.component.html',
  styleUrl: './alterar-investimento.component.scss'
})
export class AlterarInvestimentoComponent {
  idCarteira!: string;
  investimento!: Investimento;
  aporteFormControl = new FormControl('', [Validators.required, Validators.pattern(/^[0-9]+(,[0-9]+)?$/)]);
  formulario!: FormGroup;

  constructor(private dialogRef: MatDialogRef<RealizarAporteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private utilitariosService: UtilitariosService,
    private carteiraSevice: CarteiraService,
    private formBuilder: FormBuilder
  ) {
    this.investimento = data.investimento;


  }
  ngOnInit(): void {
    this.observarCarteiraSelecionada();
    this.carregarFormularioParaEdicao(this.investimento);
  }

  matcher = new ValidadorEstadoFormulario();

  public alterarInvestimento(): void {

    if (this.formulario.valid) {

      const id: string = this.investimento?.id || '';
      let nome = this.formulario.get('nome')?.value;
      let posicaoAtual = this.formulario.get('posicaoAtual')?.value;
      let percentualIdeal = this.formulario.get('percentualIdeal')?.value;

      posicaoAtual = posicaoAtual.toString().replace(',', '.');
      percentualIdeal = percentualIdeal.toString().replace(',', '.');


      const investimentoAtualizado: Investimento = {
        id: this.investimento.id,
        nome: nome,
        posicaoAtual: posicaoAtual,
        percentualIdeal: percentualIdeal
      }
      
      if (investimentoAtualizado?.id) {
        this.utilitariosService.setLoading(true);
        this.carteiraSevice.alterarInvestimento(investimentoAtualizado).pipe(
          catchError(error => {
            this.utilitariosService.mostrarNotificacaoErro(error?.message)
            return empty();
          }),
          finalize(() => {
            this.utilitariosService.setLoading(false);
            this.dialogRef.close();
          })
        ).subscribe(() => {
          this.utilitariosService.mostrarNotificacaoSucesso("Atualização realizado com Sucesso!");
          if (this.idCarteira) {
            this.carteiraSevice.distribuirAporte(this.idCarteira, 0);
          }
        });
      }
    }
  }

  private observarCarteiraSelecionada(): void {
    this.utilitariosService.observarCarteiraSelecionada().subscribe(carteiraSelecionada => {
      if (carteiraSelecionada) {
        this.idCarteira = carteiraSelecionada.id
      }
    });
  }

  private carregarFormularioParaEdicao(investimento: Investimento) {
    this.construirFormulario();

    if (investimento?.nome) {
      this.formulario.controls['nome'].setValue(investimento.nome);

      if (investimento?.posicaoAtual != null || investimento?.posicaoAtual != undefined)
        this.formulario.controls['posicaoAtual'].setValue(investimento.posicaoAtual.toString().replace('.', ','));

      if (investimento?.percentualIdeal != null || investimento?.percentualIdeal != undefined)
        this.formulario.controls['percentualIdeal'].setValue(investimento.percentualIdeal.toString().replace('.', ','));
    }
  }

  private construirFormulario() {
    this.formulario = this.formBuilder.group({
      id: [null],
      nome: ['', Validators.compose([
        Validators.required,
        Validators.pattern(/(.|\s)*\S(.|\s)*/),
        Validators.maxLength(30),
        Validators.minLength(1),
      ])],
      posicaoAtual: ['', Validators.compose([
        Validators.required,
        Validators.pattern(/^[0-9]+(,[0-9]+)?$/)
      ])],
      percentualIdeal: ['', Validators.compose([
        Validators.required,
        Validators.pattern(/^[0-9]+(,[0-9]+)?$/)
      ])]
    })
  }
}
