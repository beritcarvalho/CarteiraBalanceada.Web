import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResumoCarteiraComponent } from './paginas/resumo-carteira/resumo-carteira.component';
import { AtivoComponent } from './paginas/resumo-carteira/componentes/ativo/ativo.component';
import { MatExpansionModule } from '@angular/material/expansion';


@NgModule({
  declarations: [
    ResumoCarteiraComponent,
    AtivoComponent,
  ],
  imports: [
    CommonModule,
    MatExpansionModule
  ],
  exports: [
    ResumoCarteiraComponent
  ]
})
export class FeaturesModule { }
