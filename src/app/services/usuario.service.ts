import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  RUTA = 'api/Usuario/';
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

  GetUsuarioPorInstitucion(idInstitucion:number) {
    return this.getQuerys(`${this.RUTA}get-usuarios-institucion/${idInstitucion}`);
  }

  GetAllProfesores() {
    return this.getQuerys(`${this.RUTA}get-all-profesor`);
  }

  
  GetAllEstudiantes() {
    return this.getQuerys(`${this.RUTA}get-all-estudiantes`);
  }
}
