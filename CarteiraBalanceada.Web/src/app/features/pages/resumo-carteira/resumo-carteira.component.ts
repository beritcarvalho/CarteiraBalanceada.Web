import { Component, OnInit } from '@angular/core';
import { UtilitariosService } from '../../../shared/services/utilitarios.service';

@Component({
  selector: 'app-resumo-carteira',
  templateUrl: './resumo-carteira.component.html',
  styleUrl: './resumo-carteira.component.scss'
})
export class ResumoCarteiraComponent implements OnInit {

  constructor(private utilitarioService: UtilitariosService) {}

  ngOnInit(): void {
    this.utilitarioService.observarAlteracao().subscribe(teste => {
      console.log(teste);
      this.utilitarioService.mostrarNotificacaoInformacao('alterado') 
    });
  }
  
}
