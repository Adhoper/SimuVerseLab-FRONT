import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { HistorialExperimentoService } from '../../services/historialExperimento.service';
import { LoaderService } from '../../services/loader.service';
import { NgxPaginationModule } from 'ngx-pagination';


@Component({
  selector: 'app-historial-experimentos',
  imports: [SharedModule,NgxPaginationModule],
  templateUrl: './historial-experimentos.component.html',
  styleUrl: './historial-experimentos.component.css'
})
export class HistorialExperimentosComponent {

  historialPropio: any[] = [];
  historialOtros: any[] = [];
  tabActivo: 'propio' | 'otros' = 'propio';
  mostrarHistorialOtros: boolean = false;
  rol: string = '';
  usuario: any;
  paginaPropia: number = 1;
  paginaOtros: number = 1;

  // Filtros
  filtroPropio: string = '';
  filtroOtros: string = '';

  constructor(
    private historialService: HistorialExperimentoService,
    private loader: LoaderService
  ) {}

  ngOnInit(): void {
    this.usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    this.rol = this.usuario?.nombreRol;

    if (this.rol === 'Administrativo' || this.rol === 'Profesor') {
      this.mostrarHistorialOtros = true;
    }

    this.cargarDatos();
  }

  cargarDatos(): void {
    this.loader.show();
    this.historialService.GetHistorialPersonal(this.usuario.idUsuario).subscribe({
      next: (res: any) => {
        this.historialPropio = res.dataList || [];
        this.loader.hide();
      },
      error: (err) => {
        console.error('Error al obtener el historial personal', err);
        this.loader.hide();
      }
    });

    if (this.rol === 'Administrativo') {
      this.historialService.GetHistorialInstitucion(this.usuario.idInstitucion).subscribe({
        next: (res: any) => {
          this.historialOtros = res.dataList || [];
          console.log(this.historialOtros);
        },
        error: (err) => console.error('Error al obtener historial de la institución', err)
      });
    }

    if (this.rol === 'Profesor') {
      this.historialService.GetHistorialProfesor(this.usuario.idUsuario).subscribe({
        next: (res: any) => {
          this.historialOtros = res.dataList || [];
        },
        error: (err) => console.error('Error al obtener historial de estudiantes del profesor', err)
      });
    }
  }

  cambiarTab(tab: 'propio' | 'otros') {
    this.tabActivo = tab;
    this.paginaPropia = 1;
    this.paginaOtros = 1;
    this.filtroPropio = '';
    this.filtroOtros = '';
  }

  // Métodos para filtrar dinámicamente
  get historialPropioFiltrado() {
    if (!this.filtroPropio.trim()) return this.historialPropio;
    return this.historialPropio.filter(item =>
      item.nombreExperimento.toLowerCase().includes(this.filtroPropio.toLowerCase()) ||
      item.fechaRegistro.includes(this.filtroPropio)
    );
  }

  get historialOtrosFiltrado() {
    if (!this.filtroOtros.trim()) return this.historialOtros;
    return this.historialOtros.filter(item =>
      (item.nombreUsuario?.toLowerCase().includes(this.filtroOtros.toLowerCase())) ||
      (item.nombreExperimento?.toLowerCase().includes(this.filtroOtros.toLowerCase())) ||
      (item.fechaRegistro?.includes(this.filtroOtros))
    );
  }
}

