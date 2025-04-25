import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoaderService } from '../../../../services/loader.service';
import { AulaService } from '../../../../services/Aula.service';
import { SharedModule } from '../../../../shared/shared.module';

@Component({
  selector: 'app-asignar-estudiante',
  imports: [SharedModule],
  templateUrl: './asignar-estudiante.component.html',
  styleUrl: './asignar-estudiante.component.css'
})
export class AsignarEstudianteComponent {

  estudiantes: any[] = [];
  seleccionados: number[] = [];

  constructor(
    public dialogRef: MatDialogRef<AsignarEstudianteComponent>,
    @Inject(MAT_DIALOG_DATA) public aula: any,
    private aulaService: AulaService,
    private loader: LoaderService
  ) {}

  ngOnInit(): void {
    this.obtenerEstudiantesDisponibles();
  }

  obtenerEstudiantesDisponibles(): void {
    // this.loader.show();
    // this.aulaService.obtenerEstudiantesDisponibles().subscribe({
    //   next: (res: any) => {
    //     this.estudiantes = res.dataList || [];
    //     this.loader.hide();
    //   },
    //   error: (err:any) => {
    //     console.error('Error al obtener estudiantes:', err);
    //     this.loader.hide();
    //   }
    // });
  }

  toggleSeleccion(idEstudiante: number): void {
    if (this.seleccionados.includes(idEstudiante)) {
      this.seleccionados = this.seleccionados.filter(id => id !== idEstudiante);
    } else {
      this.seleccionados.push(idEstudiante);
    }
  }

  asignar(): void {
    // this.loader.show();
    // this.aulaService.asignarEstudiantes(this.aula.id, this.seleccionados).subscribe({
    //   next: () => {
    //     this.loader.hide();
    //     this.dialogRef.close(true);
    //   },
    //   error: (err:any) => {
    //     console.error('Error al asignar estudiantes:', err);
    //     this.loader.hide();
    //   }
    // });
  }

  cancelar(): void {
    this.dialogRef.close(false);
  }

}
