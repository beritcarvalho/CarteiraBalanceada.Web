import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResumoCarteiraComponent } from './paginas/resumo-carteira/resumo-carteira.component';
import { AtivoComponent } from './paginas/resumo-carteira/componentes/ativo/ativo.component';

import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    ResumoCarteiraComponent,
    AtivoComponent,
  ],
  imports: [
    CommonModule,
    MatExpansionModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule
  ],
  exports: [
    ResumoCarteiraComponent
  ]
})
export class FeaturesModule { }
