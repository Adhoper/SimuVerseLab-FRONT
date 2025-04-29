import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoaderService } from '../../../../services/loader.service';
import { AulaService } from '../../../../services/Aula.service';
import { SharedModule } from '../../../../shared/shared.module';
import Swal from 'sweetalert2';
import { UsuarioService } from '../../../../services/usuario.service';

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
    private usuarioService: UsuarioService,
    private loader: LoaderService
  ) {}

  ngOnInit(): void {
    this.obtenerEstudiantesDisponibles();
  }

  obtenerEstudiantesDisponibles(): void {
    this.loader.show();
    this.usuarioService.GetAllEstudiantes().subscribe({
      next: (res: any) => {
        this.estudiantes = res.dataList || [];
        this.loader.hide();
      },
      error: (err: any) => {
        console.error('Error al obtener estudiantes:', err);
        this.loader.hide();
      }
    });
  }

  toggleSeleccion(idEstudiante: number): void {
    if (this.seleccionados.includes(idEstudiante)) {
      this.seleccionados = this.seleccionados.filter(id => id !== idEstudiante);
    } else {
      this.seleccionados.push(idEstudiante);
    }
  }

  asignar(): void {
    if (this.seleccionados.length === 0) return;

    this.loader.show();
    const asignaciones = this.seleccionados.map(idEstudiante => ({
      idAula: this.aula.idAula,
      idUsuario: idEstudiante
    }));

    this.aulaService.AsignarEstudiantesAula(asignaciones).subscribe({
      next: (res: any) => {
        this.loader.hide();
        if (res.successful) {
          Swal.fire('¡Asignados!', 'Estudiantes asignados correctamente.', 'success');
          this.dialogRef.close(true);
        } else {
          Swal.fire('Error', res.message || 'No se pudieron asignar los estudiantes.', 'error');
        }
      },
      error: (err: any) => {
        console.error('Error al asignar estudiantes:', err);
        this.loader.hide();
        Swal.fire('Error', 'Hubo un error inesperado.', 'error');
      }
    });
  }

  cancelar(): void {
    this.dialogRef.close(false);
  }
}
