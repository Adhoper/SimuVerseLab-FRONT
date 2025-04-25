import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../../services/Dashboard.service';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'app-administrativo',
  imports: [SharedModule],
  templateUrl: './administrativo.component.html',
  styleUrl: './administrativo.component.css'
})
export class AdministrativoComponent implements OnInit {

    dashboard = {
      aulas: 0,
      laboratorios: 0,
      experimentos: 0,
      estudiantes: 0,
      profesores: 0,
      historial: [{
        nombre: "",
        puntaje: 2,
        tiempo:""
      }]
    };
  
  
    constructor(private dashboardService: DashboardService) {
      
    }


  ngOnInit(): void {
        // this.dashboardService.getDashboardData().subscribe((data: any) => {
    //   this.dashboard = data;
    // });
  }

}
