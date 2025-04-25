import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/Dashboard.service';
import { SharedModule } from '../../shared/shared.module';
import { AdministrativoComponent } from "./administrativo/administrativo.component";
import { ProfesorComponent } from "./profesor/profesor.component";
import { EstudianteComponent } from "./estudiante/estudiante.component";

@Component({
  selector: 'app-dashboard',
  imports: [SharedModule, AdministrativoComponent, ProfesorComponent, EstudianteComponent],
  template: `
    <app-administrativo *ngIf="rol === 'Administrativo'"></app-administrativo>
    <app-profesor *ngIf="rol === 'Profesor'"></app-profesor>
    <app-estudiante *ngIf="rol === 'Estudiante'"></app-estudiante>
  `
})
export class DashboardComponent implements OnInit {

  rol: string = '';

  constructor(private dashboardService: DashboardService) {
    
  }

  ngOnInit() {
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    this.rol = usuario?.nombreRol;
  }
}
