import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SharedModule } from '../../shared.module';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive,SharedModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {

  @Input() visible: boolean = false;
  @Output() cerrarSidebar = new EventEmitter<void>();
  rol: string = '';

  constructor(private eRef: ElementRef) {}

  ngOnInit(): void {
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    this.rol = usuario?.nombreRol;
  }

  // Detecta clic fuera del sidebar
  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const esClickDentro = this.eRef.nativeElement.contains(target);
    const esEscritorio = window.innerWidth >= 1280; // xl

    if (!esClickDentro && this.visible && !esEscritorio) {
      this.cerrarSidebar.emit();
    }
  }

  cerrar() {
    this.cerrarSidebar.emit();
  }

  seleccionarOpcion() {
    if (window.innerWidth < 1280) {
      this.cerrarSidebar.emit();
    }
  }

}
