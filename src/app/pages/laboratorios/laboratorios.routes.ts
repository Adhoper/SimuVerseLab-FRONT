import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { Routes } from "@angular/router";


export const laboratoriosRoutes: Routes = [
    {
      path: 'laboratorios',
      loadComponent: () => import("./laboratorios.component").then(c => c.LaboratoriosComponent)
  
    },

  ];