import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResumoCarteiraComponent } from './features/pages/resumo-carteira/resumo-carteira.component';
import { CalculoAporteComponent } from './features/pages/calculo-aporte/calculo-aporte.component';

const routes: Routes = [
  {
    path: 'resumo-carteira',
    component: ResumoCarteiraComponent
  },
  {
    path: 'calculo-aporte',
    component: CalculoAporteComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
