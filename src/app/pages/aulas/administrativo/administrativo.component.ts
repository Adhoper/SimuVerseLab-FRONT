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

  constructor(
    private aulasService: AulaService,
    private loader: LoaderService,
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.obtenerAulas();
  }

  obtenerAulas(): void {
    // this.loader.show();
    // this.aulasService.obtenerTodasLasAulas().subscribe({
    //   next: (res: any) => {
    //     this.aulas = res.dataList || [];
    //     this.loader.hide();
    //   },
    //   error: (err:any) => {
    //     console.error('Error al obtener las aulas:', err);
    //     this.loader.hide();
    //   },
    // });
  }

  aulasFiltradas(): any[] {
    return this.aulas.filter(aula =>
      aula.nombre.toLowerCase().includes(this.filtroNombre.toLowerCase()) &&
      (this.filtroEstatus === '' || aula.estatus === this.filtroEstatus)
    );
  }

  abrirModalCrear() {
    const dialogRef = this.dialog.open(GestionarAulaComponent, {
      width: '400px',
      data: null
    });

    // dialogRef.afterClosed().subscribe(resultado => {
    //   if (resultado) {
    //     this.aulasService.crearAula(resultado).subscribe(() => this.obtenerAulas());
    //   }
    // });
  }

  editarAula(aula: any) {
    const dialogRef = this.dialog.open(GestionarAulaComponent, {
      width: '400px',
      data: aula
    });

    // dialogRef.afterClosed().subscribe(resultado => {
    //   if (resultado) {
    //     this.aulasService.editarAula(aula.id, resultado).subscribe(() => this.obtenerAulas());
    //   }
    // });
  }

  eliminarAula(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta aula?')) {
      // this.loader.show();
      // this.aulasService.eliminarAula(id).subscribe({
      //   next: () => {
      //     this.aulas = this.aulas.filter(a => a.id !== id);
      //     this.loader.hide();
      //   },
      //   error: (err:any) => {
      //     console.error('Error al eliminar aula:', err);
      //     this.loader.hide();
      //   }
      // });
    }
  }

  asignarProfesor(aula: any) {
    const dialogRef = this.dialog.open(AsignarProfesorComponent, {
      width: '400px',
      data: aula
    });

    dialogRef.afterClosed().subscribe((asignado) => {
      if (asignado) {
        this.obtenerAulas();
      }
    });
  }

  asignarEstudiantes(aula: any) {
    const dialogRef = this.dialog.open(AsignarEstudianteComponent, {
      width: '500px',
      data: aula
    });

    dialogRef.afterClosed().subscribe((asignado) => {
      if (asignado) {
        this.obtenerAulas();
      }
    });
  }

}
