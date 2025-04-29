import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../../services/Dashboard.service';
import { SharedModule } from '../../../shared/shared.module';
import { HistorialExperimentoService } from '../../../services/historialExperimento.service';
import { AuthService } from '../../../services/AuthService.service';
import { LoaderService } from '../../../services/loader.service';
import { NgxEchartsDirective, provideEchartsCore } from 'ngx-echarts';
// import echarts core
import * as echarts from 'echarts/core';
// import necessary echarts components
import { BarChart, PieChart } from 'echarts/charts'; // Faltaba
import { TooltipComponent, LegendComponent, TitleComponent, GridComponent } from 'echarts/components'; // Faltaban
import { CanvasRenderer } from 'echarts/renderers';
import { EChartsOption } from 'echarts/types/dist/shared';
echarts.use([
  BarChart, 
  PieChart, // 👈 Necesario para pastel
  GridComponent, 
  TooltipComponent, 
  LegendComponent, 
  TitleComponent, 
  CanvasRenderer
]);


@Component({
  selector: 'app-administrativo',
  imports: [SharedModule,NgxEchartsDirective],
  templateUrl: './administrativo.component.html',
  styleUrl: './administrativo.component.css',
  providers: [
    provideEchartsCore({ echarts }),
  ]
})
export class AdministrativoComponent implements OnInit {

  HistorialExperimentosUser: any = [];
  user: any;
  graficoExperimentosRealizados: EChartsOption = {}; 
  graficoExperimentosRapidos: EChartsOption = {};
  

  dashboard = {
    aulas: 0,
    laboratorios: 0,
    experimentos: 0,
    estudiantes: 0,
    profesores: 0,
  };

  constructor(
    private dashboardService: DashboardService,
    private historialService: HistorialExperimentoService,
    private authService: AuthService,
    private loader: LoaderService
  ) { }

  ngOnInit(): void {
    this.loader.show();
    this.user = this.authService.getUsuario();
  
    this.dashboardService.GetDashboardAdministrativo(this.user.idInstitucion).subscribe({
      next: (res: any) => {
        const data = res.singleData;
        if (data) {
          this.dashboard.aulas = data.cantidadAulas || 0;
          this.dashboard.laboratorios = data.cantidadLaboratorios || 0;
          this.dashboard.profesores = data.cantidadProfesores || 0;
          this.dashboard.estudiantes = data.cantidadEstudiantes || 0;
        }
      },
      error: (err: any) => {
        console.error('Error al obtener el resumen del dashboard administrativo:', err);
      }
    });
  
    this.historialService.GetHistorialInstitucion(this.user.idInstitucion).subscribe({
      next: (res: any) => {
        this.HistorialExperimentosUser = res.dataList || [];
  
        // 👉 Llamamos función para preparar los gráficos
        this.prepararGraficos();
  
        this.loader.hide();
      },
      error: (err: any) => {
        console.error('Error al obtener historial de experimentos:', err);
        this.loader.hide();
      }
    });
  }
  

  prepararGraficos(): void {
    if (!this.HistorialExperimentosUser || this.HistorialExperimentosUser.length === 0) {
      return;
    }
  
    // Calcular el número de veces que se ha realizado cada experimento
    const conteoExperimentos: { [key: string]: number } = {};
    const tiemposExperimentos: { [key: string]: number[] } = {};
  
    this.HistorialExperimentosUser.forEach((item: any) => {
      if (item.nombreExperimento) {
        conteoExperimentos[item.nombreExperimento] = (conteoExperimentos[item.nombreExperimento] || 0) + 1;
        if (!tiemposExperimentos[item.nombreExperimento]) {
          tiemposExperimentos[item.nombreExperimento] = [];
        }
        tiemposExperimentos[item.nombreExperimento].push(item.tiempoTotalSegundos || 0);
      }
    });
  
    const datosConteo = Object.keys(conteoExperimentos).map(nombreExperimento => {
      const laboratorio = this.obtenerNombreLaboratorio(nombreExperimento);
      return {
        name: `${nombreExperimento} (${laboratorio})`,
        value: conteoExperimentos[nombreExperimento]
      };
    });
    
    const datosPromedio = Object.keys(tiemposExperimentos).map(nombreExperimento => {
      const tiempos = tiemposExperimentos[nombreExperimento];
      const promedio = tiempos.reduce((sum, tiempo) => sum + tiempo, 0) / tiempos.length;
      const laboratorio = this.obtenerNombreLaboratorio(nombreExperimento);
      return {
        name: `${nombreExperimento} (${laboratorio})`,
        value: parseFloat(promedio.toFixed(2))
      };
    });
    
  
    // Configurar gráfico de experimentos más realizados
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
          data: datosConteo,
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
  
    // Configurar gráfico de experimentos más rápidos
    this.graficoExperimentosRapidos = {
      title: {
        text: 'Experimentos más rápidos (promedio)',
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
          name: 'Promedio de segundos',
          type: 'pie',
          radius: '50%',
          data: datosPromedio,
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
  
  obtenerNombreLaboratorio(nombreExperimento: string): string {
    const encontrado = this.HistorialExperimentosUser.find((item: any) => item.nombreExperimento === nombreExperimento);
    return encontrado?.nombreLaboratorio || 'Sin Laboratorio';
  }
  

}
