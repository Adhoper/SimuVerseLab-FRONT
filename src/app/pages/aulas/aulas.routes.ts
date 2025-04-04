import { Routes } from "@angular/router";


export const aulasRoutes: Routes = [
    {
      path: 'aulas',
      loadComponent: () => import("./aulas.component").then(c => c.AulasComponent)
  
    },
    // {
    //   path: 'videojuego-detalle-alquiler',
    //   loadComponent: () => import("./detalle-alquiler/detalle-alquiler.component").then(c => c.DetalleAlquilerComponent)
  
    // }
  ];