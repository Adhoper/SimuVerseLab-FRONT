import { Routes } from '@angular/router';
import { aulasRoutes } from './pages/aulas/aulas.routes';
import { laboratoriosRoutes } from './pages/laboratorios/laboratorios.routes';

export const routes: Routes = [



    ...aulasRoutes,
    ...laboratoriosRoutes,
    {
        path: 'home',
        loadComponent: () => import("./pages/home/home.component").then(c => c.HomeComponent)
    },
    {
        path: '**',
        redirectTo: 'home',
    },
];
