import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { Routes } from "@angular/router";


export const laboratoriosRoutes: Routes = [
    {
      path: 'laboratorios',
      loadComponent: () => import("./laboratorios.component").then(c => c.LaboratoriosComponent)
  
    },
    // {
    //   path: 'videojuego-detalle-alquiler',
    //   loadComponent: () => import("./detalle-alquiler/detalle-alquiler.component").then(c => c.DetalleAlquilerComponent)
  
    // }
  ];