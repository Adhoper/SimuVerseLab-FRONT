import { Component } from '@angular/core';
import { DashboardService } from '../../../services/Dashboard.service';
import { SharedModule } from '../../../shared/shared.module';
import { AuthService } from '../../../services/AuthService.service';
import { HistorialExperimentoService } from '../../../services/historialExperimento.service';
import { LoaderService } from '../../../services/loader.service';
import {NgxEchartsDirective, provideEchartsCore } from 'ngx-echarts';
import * as echarts from 'echarts/core';
import { PieChart } from 'echarts/charts';
import { TooltipComponent, LegendComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import { EChartsOption } from 'echarts/types/dist/shared';

echarts.use([PieChart, TooltipComponent, LegendComponent, CanvasRenderer]);


@Component({
  selector: 'app-profesor',
  imports: [SharedModule,NgxEchartsDirective],
  templateUrl: './profesor.component.html',
  styleUrl: './profesor.component.css',
  providers: [
    provideEchartsCore({ echarts })
  ]
})
export class ProfesorComponent {

  dashboard = {
    aulas: [] as { nombre: string, estudiantes: number }[],
    laboratorios: 0,
  };

  graficoExperimentosRealizados: EChartsOption = {}; 

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

    // Obtener resumen de dashboard para profesor
    this.dashboardService.GetDashboardProfesor(this.user.idUsuario).subscribe({
      next: (res: any) => {
        const aulasData = res.dataList || [];
        if (aulasData.length > 0) {
          this.dashboard.aulas = aulasData.map((item: any) => ({
            nombre: item.nombreAula,
            estudiantes: item.cantidadEstudiantes
          }));
          this.dashboard.laboratorios = aulasData[0]?.cantidadLaboratorios || 0;
        }
      },
      error: (err: any) => {
        console.error('Error al obtener el dashboard del profesor:', err);
      }
    });

    // Obtener historial de experimentos realizados
    this.historialService.GetHistorialProfesor(this.user.idUsuario).subscribe({
      next: (res: any) => {
        this.HistorialExperimentosUser = res.dataList || [];
        this.prepararGraficoExperimentosRealizados();
        this.loader.hide();
      },
      error: (err: any) => {
        console.error('Error al obtener historial de experimentos:', err);
        this.loader.hide();
      }
    });
    
  }

  prepararGraficoExperimentosRealizados(): void {
    if (!this.HistorialExperimentosUser || this.HistorialExperimentosUser.length === 0) {
      return;
    }
  
    const conteoExperimentos: { [key: string]: number } = {};
  
    this.HistorialExperimentosUser.forEach((item: any) => {
      if (item.nombreExperimento) {
        const nombreCompleto = `${item.nombreExperimento} (${item.nombreLaboratorio || 'Sin Laboratorio'})`;
        conteoExperimentos[nombreCompleto] = (conteoExperimentos[nombreCompleto] || 0) + 1;
      }
    });
  
    const datos = Object.keys(conteoExperimentos).map(nombre => ({
      name: nombre,
      value: conteoExperimentos[nombre]
    }));
  
    this.graficoExperimentosRealizados = {
      title: {
        text: 'Experimentos más realizados',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        bottom: '0%',
        left: 'center'
      },
      series: [
        {
          name: 'Realizados',
          type: 'pie',
          radius: '50%',
          data: datos,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
  }
  

  verHistorialCompleto() {
    // Aquí redirigimos al historial completo
    window.location.href = '/historialExperimento';
  }

}
