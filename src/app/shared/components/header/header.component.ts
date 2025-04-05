import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Route, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  rutaActual: string = '';

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      const url = event.urlAfterRedirects;

      // Puedes hacer un pequeño mapeo si lo quieres bonito
      if (url.includes('/dashboard')) {
        this.rutaActual = 'Dashboard';
      } else if (url.includes('/aulas')) {
        this.rutaActual = 'Aulas';
      } else if (url.includes('/laboratorios')) {
        this.rutaActual = 'Laboratorios';
      } else {
        this.rutaActual = '';
      }
    });
  }

}
