import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { Routes } from "@angular/router";


export const usuarioRoutes: Routes = [
    {
      path: 'usuarios',
      loadComponent: () => import("./usuarios.component").then(c => c.UsuariosComponent)
  
    },

  ];