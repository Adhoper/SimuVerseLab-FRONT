import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoaderService } from '../../../../services/loader.service';
import { AulaService } from '../../../../services/Aula.service';
import { SharedModule } from '../../../../shared/shared.module';
import Swal from 'sweetalert2';
import { UsuarioService } from '../../../../services/usuario.service';
import { AuthService } from '../../../../services/AuthService.service';

@Component({
  selector: 'app-asignar-profesor',
  imports: [SharedModule],
  templateUrl: './asignar-profesor.component.html',
  styleUrl: './asignar-profesor.component.css'
})
export class AsignarProfesorComponent {

  profesores: any[] = [];
  idProfesorSeleccionado: number | null = null;
  user: any;

  constructor(
    public dialogRef: MatDialogRef<AsignarProfesorComponent>,
    @Inject(MAT_DIALOG_DATA) public aula: any,
    private aulaService: AulaService,
    private usuarioService: UsuarioService,
    private authService: AuthService,
    private loader: LoaderService
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getUsuario();
    this.obtenerProfesores();
  }

  obtenerProfesores() {
    this.loader.show();
    this.usuarioService.GetAllProfesores(this.user.idInstitucion).subscribe({
      next: (res: any) => {
        this.profesores = res.dataList || [];
        this.loader.hide();
      },
      error: (err: any) => {
        //console.error('Error al obtener profesores:', err);
        this.loader.hide();
        Swal.fire('Error', 'No se pudieron cargar los profesores.', 'error');
      }
    });
  }

  asignar() {
    if (!this.idProfesorSeleccionado) {
      return;
    }

    const payload = {
      idAula: this.aula.idAula,
      idUsuario: this.idProfesorSeleccionado
    };

    this.loader.show();
    this.aulaService.AsignarProfesorAula(payload).subscribe({
      next: (res: any) => {
        this.loader.hide();
        if (res.successful) {
          Swal.fire('¡Asignado!', 'Profesor asignado correctamente.', 'success');
          this.dialogRef.close(true);
        } else {
          console.log(res.message);
          Swal.fire('Error', res.message || 'No se pudo asignar el profesor.', 'error');
        }
      },
      error: (err: any) => {
        this.loader.hide();
        console.error('Error al asignar profesor:', err);
        Swal.fire('Error', 'Hubo un error inesperado.', 'error');
      }
    });
  }

  cancelar() {
    this.dialogRef.close(false);
  }

}
