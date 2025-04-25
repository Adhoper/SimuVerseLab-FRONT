import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExperimentoService {

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


  GetExperimento(idLaboratorio:number) {
    return this.getQuerys(`${this.RUTA}get-experimentos/${idLaboratorio}`);
  }

  // setPublicarCalificacion(param: any) {
  //   return this.postQuerys(`${this.RUTA}set-calification`, param);
  // }
}
