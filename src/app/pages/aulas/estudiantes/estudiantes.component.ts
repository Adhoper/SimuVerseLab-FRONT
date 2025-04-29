import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { AulaService } from '../../../services/Aula.service';
import { AuthService } from '../../../services/AuthService.service';
import { LoaderService } from '../../../services/loader.service';

@Component({
  selector: 'app-estudiantes',
  imports: [SharedModule],
  templateUrl: './estudiantes.component.html',
  styleUrl: './estudiantes.component.css'
})
export class EstudiantesComponent {

  aulas: any[] = [];
  filtroNombre: string = '';

  constructor(
    private aulaService: AulaService,
    private authService: AuthService,
    private loader: LoaderService
  ) {}

  ngOnInit(): void {
    const usuario = this.authService.getUsuario();
    if (usuario?.idUsuario) {
      this.obtenerAulasDelEstudiante(usuario.idUsuario);
    }
  }

  obtenerAulasDelEstudiante(idEstudiante: number): void {
    this.loader.show();
    this.aulaService.GetAulasEstudiantes(idEstudiante).subscribe({
      next: (res: any) => {
        this.aulas = res.dataList?.map((a: any) => ({
          idAula: a.idAula,
          nombre: a.nombreAula, // ajuste clave
          profesor: a.profesor
        })) || [];
        this.loader.hide();
      },
      error: (err: any) => {
        console.error('Error al obtener aulas del estudiante', err);
        this.loader.hide();
      }
    });
  }
  

  aulasFiltradas(): any[] {
    return this.aulas.filter(aula =>
      aula.nombre.toLowerCase().includes(this.filtroNombre.toLowerCase())
    );
  }

}
