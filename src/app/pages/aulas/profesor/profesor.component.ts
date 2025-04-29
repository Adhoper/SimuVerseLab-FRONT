import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { AulaService } from '../../../services/Aula.service';
import { AuthService } from '../../../services/AuthService.service';
import { LoaderService } from '../../../services/loader.service';
import { MatDialog } from '@angular/material/dialog';
import { VerEstudiantesComponent } from './ver-estudiantes/ver-estudiantes.component';

@Component({
  selector: 'app-profesor',
  imports: [SharedModule],
  templateUrl: './profesor.component.html',
  styleUrl: './profesor.component.css'
})
export class ProfesorComponent {
  aulas: any[] = [];
  filtroNombre: string = '';

  constructor(
    private aulaService: AulaService,
    private authService: AuthService,
    private loader: LoaderService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const usuario = this.authService.getUsuario();
    if (usuario?.idUsuario) {
      this.obtenerAulasAsignadas(usuario.idUsuario);
    }
  }

  obtenerAulasAsignadas(idProfesor: number): void {
    this.loader.show();
    this.aulaService.GetAulasProfesor(idProfesor).subscribe({
      next: (res: any) => {
        this.loader.hide();
        if (res.successful) {
          // 👇 Aseguramos que cada aula use la lista correcta
          this.aulas = (res.dataList || []).map((aula: any) => ({
            ...aula,
            estudiantes: aula.listaEstudiantes || []
          }));
        }
      },
      error: (err:any) => {
        console.error('Error al obtener aulas del profesor', err);
        this.loader.hide();
      }
    });
  }

  aulasFiltradas(): any[] {
    return this.aulas.filter(aula =>
      aula.nombre.toLowerCase().includes(this.filtroNombre.toLowerCase())
    );
  }

  verEstudiantes(aula: any) {
    this.dialog.open(VerEstudiantesComponent, {
      width: '70vw',
      maxWidth: '80vw',
      height: 'auto',
      panelClass: 'custom-modal',
      data: aula
    });
  }
}
