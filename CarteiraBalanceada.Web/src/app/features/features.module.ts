import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResumoCarteiraComponent } from './pages/resumo-carteira/resumo-carteira.component';
import { InvestimentoComponent } from './pages/resumo-carteira/components/investimento/investimento.component';
import { SharedModule } from '../shared/shared.module';
import { CalculoAporteComponent } from './pages/calculo-aporte/calculo-aporte.component';
import { SugestaoAporteComponent } from './pages/calculo-aporte/components/sugestao-aporte/sugestao-aporte.component';
import { RealizarAporteComponent } from './pages/resumo-carteira/components/realizar-aporte/realizar-aporte.component';
import { AlterarInvestimentoComponent } from './pages/resumo-carteira/components/alterar-investimento/alterar-investimento.component';



@NgModule({
  declarations: [
    ResumoCarteiraComponent,
    InvestimentoComponent,
    CalculoAporteComponent,
    SugestaoAporteComponent,
    RealizarAporteComponent,
    AlterarInvestimentoComponent
  ],
  imports: [
    CommonModule,
    SharedModule   
  ],
  exports: [
    ResumoCarteiraComponent,
    CalculoAporteComponent
  ]
})
export class FeaturesModule { }
