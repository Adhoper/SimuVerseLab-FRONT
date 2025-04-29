import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  RUTA = 'api/Dashboard/';
  BASE_API = environment.BASE_API_URL;

  constructor(private http: HttpClient) {}

  getQuerys(query: string) {
    const url = `${this.BASE_API}${query}`;
    return this.http.get(url);
  }

  postQuerys(query: string, data: any) {
    const url = `${this.BASE_API}${query}`;
    return this.http.post(url, data);
  }

  // 🔵 Dashboard para Administrativo
  GetDashboardAdministrativo(idInstitucion: number) {
    return this.getQuerys(
      `${this.RUTA}get-dashboard-administrativo/${idInstitucion}`
    );
  }

  // 🟠 Dashboard para Profesor
  GetDashboardProfesor(idUsuario: number) {
    return this.getQuerys(`${this.RUTA}get-dashboard-profesor/${idUsuario}`);
  }

  // 🟢 Dashboard para Estudiante
  GetDashboardEstudiante(idUsuario: number) {
    return this.getQuerys(`${this.RUTA}get-dashboard-estudiante/${idUsuario}`);
  }
}
