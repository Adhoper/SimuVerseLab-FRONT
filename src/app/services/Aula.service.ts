import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AulaService {

  RUTA = 'api/Aula/';
  BASE_API = environment.BASE_API_URL;

  constructor(private http: HttpClient) {}

  private getQuery(query: string) {
    const url = `${this.BASE_API}${query}`;
    return this.http.get(url);
  }

  private postQuery(query: string, data: any) {
    const url = `${this.BASE_API}${query}`;
    return this.http.post(url, data);
  }

  // Obtener todas las aulas

  ObtenerAulas(idInstitucion:number) {
    return this.getQuery(`${this.RUTA}get-all-aulas/${idInstitucion}`);
  }

  // Crear un aula
  CrearAula(data: any) {
    return this.postQuery(`${this.RUTA}set-aula`, data);
  }

  // Editar un aula
  EditarAula(data: any) {
    return this.postQuery(`${this.RUTA}update-aula`, data);
  }

  // Eliminar un aula
  CambiarEstatusAula(idAula: number) {
    return this.postQuery(`${this.RUTA}change-estatus-aula/${idAula}`, {});
  }

  // Asignar profesor a un aula
  AsignarProfesorAula(data: any) {
    return this.postQuery(`${this.RUTA}asignar-profesor-aula`, data);
  }

  // Asignar estudiantes a un aula
  AsignarEstudiantesAula(data: any) {
    return this.postQuery(`${this.RUTA}asignar-estudiantes-aula`, data);
  }

  GetAulasProfesor(IdUsuario:number) {
    return this.getQuery(`${this.RUTA}get-aula-profesores/${IdUsuario}`);
  }

  GetAulasEstudiantes(IdUsuario:number) {
    return this.getQuery(`${this.RUTA}get-aulas-por-estudiantes/${IdUsuario}`);
  }
}
