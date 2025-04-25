import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoaderService } from '../../../../services/loader.service';
import { AulaService } from '../../../../services/Aula.service';
import { SharedModule } from '../../../../shared/shared.module';

@Component({
  selector: 'app-asignar-profesor',
  imports: [SharedModule],
  templateUrl: './asignar-profesor.component.html',
  styleUrl: './asignar-profesor.component.css'
})
export class AsignarProfesorComponent {

  profesores: any[] = [];
  idProfesorSeleccionado: number | null = null;

  constructor(
    public dialogRef: MatDialogRef<AsignarProfesorComponent>,
    @Inject(MAT_DIALOG_DATA) public aula: any,
    private aulaService: AulaService,
    private loader: LoaderService
  ) {}

  ngOnInit(): void {
    this.obtenerProfesores();
  }

  obtenerProfesores() {
    // this.loader.show();
    // this.aulaService.obtenerProfesoresDisponibles().subscribe({
    //   next: (res: any) => {
    //     this.profesores = res.dataList || [];
    //     this.loader.hide();
    //   },
    //   error: (err:any) => {
    //     console.error('Error al obtener profesores:', err);
    //     this.loader.hide();
    //   }
    // });
  }

  asignar() {
    if (this.idProfesorSeleccionado) {
      // this.loader.show();
      // this.aulaService.asignarProfesor(this.aula.id, this.idProfesorSeleccionado).subscribe({
      //   next: () => {
      //     this.loader.hide();
      //     this.dialogRef.close(true);
      //   },
      //   error: (err:any) => {
      //     console.error('Error al asignar profesor:', err);
      //     this.loader.hide();
      //   }
      // });
    }
  }

  cancelar() {
    this.dialogRef.close(false);
  }

}
