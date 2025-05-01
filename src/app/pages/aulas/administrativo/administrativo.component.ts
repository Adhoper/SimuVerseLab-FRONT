import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AulaService } from '../../../services/Aula.service';
import { AuthService } from '../../../services/AuthService.service';
import { LoaderService } from '../../../services/loader.service';
import { SharedModule } from '../../../shared/shared.module';
import { MatDialog } from '@angular/material/dialog';
import { GestionarAulaComponent } from './gestionar-aula/gestionar-aula.component';
import { AsignarProfesorComponent } from './asignar-profesor/asignar-profesor.component';
import { AsignarEstudianteComponent } from './asignar-estudiante/asignar-estudiante.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-administrativo',
  imports: [SharedModule],
  templateUrl: './administrativo.component.html',
  styleUrl: './administrativo.component.css'
})
export class AdministrativoComponent implements OnInit {

  aulas: any[] = [];
  filtroNombre: string = '';
  filtroEstatus: string = '';
  user: any;

  constructor(
    private aulasService: AulaService,
    private loader: LoaderService,
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getUsuario();
    //console.log(this.user);
    this.obtenerAulas();
  }

  obtenerAulas(): void {
    this.loader.show();
    this.aulasService.ObtenerAulas(this.user.idInstitucion).subscribe({
      next: (res: any) => {
        this.aulas = res.dataList || [];
        //console.log(this.aulas);
        this.loader.hide();
      },
      error: (err: any) => {
        console.error('Error al obtener las aulas:', err);
        this.loader.hide();
      }
    });
  }

  aulasFiltradas(): any[] {
    return this.aulas.filter(aula =>
      (
        (aula.nombre && aula.nombre.toLowerCase().includes(this.filtroNombre.toLowerCase())) ||
        (aula.profesor && aula.profesor.toLowerCase().includes(this.filtroNombre.toLowerCase()))
      ) &&
      (this.filtroEstatus === '' || aula.estatus === this.filtroEstatus)
    );
  }
  

  abrirModalCrear() {
    const dialogRef = this.dialog.open(GestionarAulaComponent, {
      width: '400px',
      data: null
    });
  
    dialogRef.afterClosed().subscribe(resultado => {
      if (resultado) {
        // Ya se creó desde el modal, solo recargar la lista
        this.obtenerAulas();
      }
    });
  }
  
  editarAula(aula: any) {
    const dialogRef = this.dialog.open(GestionarAulaComponent, {
      width: '400px',
      data: aula
    });
  
    dialogRef.afterClosed().subscribe(resultado => {
      if (resultado) {
        // Ya se editó desde el modal, solo recargar la lista
        this.obtenerAulas();
      }
    });
  }
  

  confirmarCambioEstatus(idAula: number) {
    Swal.fire({
      title: '¿Deseas cambiar el estatus?',
      text: 'Se actualizará el estado del aula',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cambiar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.cambiarEstatusAula(idAula);
      } else {
        this.obtenerAulas(); // Para devolver visualmente el estado al original si cancela
      }
    });
  }
  
  cambiarEstatusAula(idAula: number) {
    this.loader.show();
    this.aulasService.CambiarEstatusAula(idAula).subscribe({
      next: (res: any) => {
        this.loader.hide();
        if (res.successful) {
          this.obtenerAulas();
          Swal.fire('¡Actualizado!', 'El estatus del aula fue cambiado.', 'success');
        } else {
          Swal.fire('Error', res.message || 'No se pudo cambiar el estatus.', 'error');
        }
      },
      error: (err) => {
        this.loader.hide();
        console.error('Error al cambiar estatus del aula:', err);
        Swal.fire('Error', 'Hubo un error inesperado.', 'error');
      }
    });
  }
  
  
  

  asignarProfesor(aula: any) {
    const dialogRef = this.dialog.open(AsignarProfesorComponent, {
      width: '70vw',
  maxWidth: '80vw',
  height: 'auto',
  panelClass: 'custom-modal',
      data: aula
    });
  
    dialogRef.afterClosed().subscribe((resultado) => {
      if (resultado) {
        // 🔵 El modal ya hace la asignación. Aquí simplemente recargamos.
        this.obtenerAulas();
      }
    });
  }
  

  asignarEstudiantes(aula: any) {
    const dialogRef = this.dialog.open(AsignarEstudianteComponent, {
      width: '70vw',
      maxWidth: '90vw',
      height: 'auto',
      panelClass: 'custom-modal',
      data: aula
    });

    dialogRef.afterClosed().subscribe((resultado) => {
      if (resultado) {
        // 🔵 El modal ya hace la asignación. Aquí simplemente recargamos.
        this.obtenerAulas();
      }
    });
  }
}
