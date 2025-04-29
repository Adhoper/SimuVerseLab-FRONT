import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SharedModule } from '../../../../shared/shared.module';

@Component({
  selector: 'app-ver-estudiantes',
  imports: [SharedModule],
  templateUrl: './ver-estudiantes.component.html',
  styleUrl: './ver-estudiantes.component.css'
})
export class VerEstudiantesComponent {

  constructor(
    public dialogRef: MatDialogRef<VerEstudiantesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  cerrar() {
    this.dialogRef.close();
  }

}
