import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResumoCarteiraComponent } from './paginas/resumo-carteira/resumo-carteira.component';
import { AtivoComponent } from './paginas/resumo-carteira/componentes/ativo/ativo.component';
import { SharedModule } from '../shared/shared.module';




@NgModule({
  declarations: [
    ResumoCarteiraComponent,
    AtivoComponent,
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    ResumoCarteiraComponent
  ]
})
export class FeaturesModule { }
