import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Route, Router } from '@angular/router';
import { filter } from 'rxjs';
import { AuthService } from '../../../services/AuthService.service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  rutaActual: string = '';
  nombreCompleto: string = '';
  nombreInstitucion: string ='';
  rolUsuario = '';
  @Output() abrirSidebar = new EventEmitter<void>();

  constructor(private router: Router,
    private authService: AuthService
  ) {

    const user = this.authService.getUsuario();

    if(user){
      this.nombreCompleto = `${user.nombre} ${user.apellido}`;
      this.nombreInstitucion = user.nombreInstitucion;
      this.rolUsuario = user.nombreRol;
    }

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

  cerrarSesion() {
    this.authService.logout();
  }

  toggleSidebar() {
    this.abrirSidebar.emit();
  }

}
