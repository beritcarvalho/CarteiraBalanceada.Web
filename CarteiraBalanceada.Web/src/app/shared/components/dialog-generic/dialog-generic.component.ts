import { Component, Inject } from '@angular/core';
import { DialogGeneric } from '../../interfaces/dialog-generic';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-generic',
  templateUrl: './dialog-generic.component.html',
  styleUrl: './dialog-generic.component.scss'
})
export class DialogGenericComponent {
  dialogConteudo: DialogGeneric = {
    titulo: '',
    conteudo: ''
  }
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogGeneric,
  public dialogRef: MatDialogRef<DialogGenericComponent>){
    this.dialogConteudo = data;
  }


}
