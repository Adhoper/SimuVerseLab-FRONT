import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HistorialExperimentoService {

  RUTA = 'api/Experimento/'
  BASE_API = environment.BASE_API_URL;

  constructor(private http: HttpClient) { }

  getQuerys(query: string) {
    const url = `${this.BASE_API}${query}`;
    return this.http.get(url);
  }

  postQuerys(query: string, data: any) {
    const url = `${this.BASE_API}${query}`;
    return this.http.post(url, data);
  }


// 🧠 Trae el historial del propio usuario
GetHistorialPersonal(idUsuario: number) {
    return this.getQuerys(`${this.RUTA}get-historial-experimento-personal/${idUsuario}`);
  }

  // 🧠 Trae el historial de la institución (para Administrativos)
  GetHistorialInstitucion(idInstitucion: number) {
    return this.getQuerys(`${this.RUTA}get-historial-experimento-institucion/${idInstitucion}`);
  }

  // 🧠 Trae el historial de los estudiantes asignados al profesor
  GetHistorialProfesor(idUsuario: number) {
    return this.getQuerys(`${this.RUTA}get-historial-experimento-profesor/${idUsuario}`);
  }
}
