import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../../services/Dashboard.service';
import { SharedModule } from '../../../shared/shared.module';
import { LoaderService } from '../../../services/loader.service';

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
    historial: [{
      nombre: "",
      puntaje: 2,
      tiempo:""
    }]
  };

  constructor(private dashboardService: DashboardService, private loader: LoaderService) {}

  ngOnInit(): void {
    // this.dashboardService.getEstudianteDashboard().subscribe((data: any) => {
    //   this.dashboard = data;
    // });
  }

}
