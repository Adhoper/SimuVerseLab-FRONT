import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { Routes } from "@angular/router";


export const historialExperimentoRoutes: Routes = [
    {
      path: 'historialExperimento',
      loadComponent: () => import("./historial-experimentos.component").then(c => c.HistorialExperimentosComponent)
  
    },

  ];