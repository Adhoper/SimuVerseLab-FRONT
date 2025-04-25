import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { AulaService } from '../../../services/Aula.service';
import { AuthService } from '../../../services/AuthService.service';
import { LoaderService } from '../../../services/loader.service';

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
    private loader: LoaderService
  ) {}

  ngOnInit(): void {
    const usuario = this.authService.getUsuario();
    if (usuario?.idUsuario) {
      this.obtenerAulasAsignadas(usuario.idUsuario);
    }
  }

  obtenerAulasAsignadas(idProfesor: number): void {
    //this.loader.show();
    // this.aulaService.obtenerAulasPorProfesor(idProfesor).subscribe({
    //   next: (res: any) => {
    //     this.aulas = res.dataList || [];
    //     this.loader.hide();
    //   },
    //   error: (err) => {
    //     console.error('Error al obtener aulas del profesor', err);
    //     this.loader.hide();
    //   }
    // });
  }

  aulasFiltradas(): any[] {
    return this.aulas.filter(aula =>
      aula.nombre.toLowerCase().includes(this.filtroNombre.toLowerCase())
    );
  }
}
