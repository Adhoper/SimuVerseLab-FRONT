import { Component } from '@angular/core';
import { DashboardService } from '../../../services/Dashboard.service';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'app-profesor',
  imports: [SharedModule],
  templateUrl: './profesor.component.html',
  styleUrl: './profesor.component.css'
})
export class ProfesorComponent {

  dashboard = {
    aulas: [{
      nombre:"aula asdasd",
      estudiantes: 5
    }] as { nombre: string, estudiantes: number }[],
    laboratorios: 0,
    historial: [{
      nombre: "",
      puntaje: 2,
      tiempo:""
    }]
  };

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    // this.dashboardService.getProfesorDashboard().subscribe((data: any) => {
    //   this.dashboard = data;
    // });
  }

}
