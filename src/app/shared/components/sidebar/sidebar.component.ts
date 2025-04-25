import { Component, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SharedModule } from '../../shared.module';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive,SharedModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  @Input() visible: boolean = false;
  @Output() cerrarSidebar = new EventEmitter<void>();

  constructor(private eRef: ElementRef) {}

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
