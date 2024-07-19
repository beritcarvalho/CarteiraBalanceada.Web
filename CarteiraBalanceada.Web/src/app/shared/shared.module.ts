import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './componentes/nav-bar/nav-bar.component';

import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';

import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    NavBarComponent
  ],
  imports: [
    CommonModule,
    MatExpansionModule,
    MatCardModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    HttpClientModule
  ],
  exports: [
    MatExpansionModule,
    MatCardModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
  ]
})
export class SharedModule { }
