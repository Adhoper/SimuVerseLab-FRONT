import { Component } from '@angular/core';
import { ProfesorComponent } from './profesor/profesor.component';
import { EstudiantesComponent } from './estudiantes/estudiantes.component';
import { AdministrativoComponent } from './administrativo/administrativo.component';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-aulas',
  imports: [ProfesorComponent,EstudiantesComponent,AdministrativoComponent,SharedModule],
  template: `
  <app-administrativo *ngIf="rol === 'Administrativo'"></app-administrativo>
  <app-profesor *ngIf="rol === 'Profesor'"></app-profesor>
  <app-estudiantes *ngIf="rol === 'Estudiante'"></app-estudiantes>
`
})
export class AulasComponent {
  rol: string = '';

  ngOnInit(): void {
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    this.rol = usuario?.nombreRol;
  }
}
