import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../../services/Dashboard.service';
import { SharedModule } from '../../../shared/shared.module';
import { LoaderService } from '../../../services/loader.service';
import { AuthService } from '../../../services/AuthService.service';
import { HistorialExperimentoService } from '../../../services/historialExperimento.service';

@Component({
  selector: 'app-estudiante',
  imports: [SharedModule],
  templateUrl: './estudiante.component.html',
  styleUrl: './estudiante.component.css'
})
export class EstudianteComponent implements OnInit {

  dashboard = {
    aulas: [] as string[],
    laboratorios: 0,
  };

  user: any;
  HistorialExperimentosUser: any = [];

  constructor(
    private dashboardService: DashboardService,
    private historialService: HistorialExperimentoService,
    private authService: AuthService,
    private loader: LoaderService
  ) {}

  ngOnInit(): void {
    this.loader.show();
    this.user = this.authService.getUsuario();

    // Obtener resumen del dashboard del estudiante
    this.dashboardService.GetDashboardEstudiante(this.user.idUsuario).subscribe({
      next: (res: any) => {
        const data = res.dataList || [];
        this.dashboard.aulas = data.map((item: any) => item.nombreAula);
        this.dashboard.laboratorios = data.length > 0 ? data[0].cantidadLaboratorios : 0;
      },
      error: (err: any) => {
        console.error('Error al obtener dashboard de estudiante:', err);
      }
    });

    // Obtener historial personal de experimentos
    this.historialService.GetHistorialPersonal(this.user.idUsuario).subscribe({
      next: (res: any) => {
        this.HistorialExperimentosUser = res.dataList || [];
        this.loader.hide();
      },
      error: (err: any) => {
        console.error('Error al obtener historial de experimentos:', err);
        this.loader.hide();
      }
    });
  }

  verHistorialCompleto() {
    // Aquí redirigimos al historial completo
    window.location.href = '/historialExperimento';
  }

}
