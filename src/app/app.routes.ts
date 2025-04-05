import { Routes } from '@angular/router';
import { aulasRoutes } from './pages/aulas/aulas.routes';
import { laboratoriosRoutes } from './pages/laboratorios/laboratorios.routes';

export const routes: Routes = [
    
    {
        path: '',
        loadComponent: () => import("./shared/components/layout/layout.component").then(c => c.LayoutComponent),
        children: [
            {
            path: 'dashboard',
            loadComponent: () => import("./pages/dashboard/dashboard.component").then(c => c.DashboardComponent),
            },
            ...laboratoriosRoutes,
            ...aulasRoutes,
            {
                path: '**',
                redirectTo: 'dashboard',
            },

    ]
    },

];
