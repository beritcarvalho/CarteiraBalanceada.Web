import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResumoCarteiraComponent } from './pages/resumo-carteira/resumo-carteira.component';
import { AtivoComponent } from './pages/resumo-carteira/components/ativo/ativo.component';
import { SharedModule } from '../shared/shared.module';
import { CalculoAporteComponent } from './pages/calculo-aporte/calculo-aporte.component';
import { SugestaoAporteComponent } from './pages/calculo-aporte/components/sugestao-aporte/sugestao-aporte.component';




@NgModule({
  declarations: [
    ResumoCarteiraComponent,
    AtivoComponent,
    CalculoAporteComponent,
    SugestaoAporteComponent,
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
