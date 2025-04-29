import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { UsuarioService } from '../../services/usuario.service';
import { LoaderService } from '../../services/loader.service';
import { AuthService } from '../../services/AuthService.service';

@Component({
  selector: 'app-usuarios',
  imports: [SharedModule],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent {

  usuarios: any[] = [];
  filtroNombre: string = '';
  user: any;

  constructor(
    private usuarioService: UsuarioService,
    private loader: LoaderService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getUsuario();
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.loader.show();
    this.usuarioService.GetUsuarioPorInstitucion(this.user.idInstitucion).subscribe({
      next: (res: any) => {
        this.usuarios = res.dataList || [];
        this.loader.hide();
      },
      error: (err:any) => {
        console.error('Error al cargar usuarios', err);
        this.loader.hide();
      }
    });
  }

  get usuariosFiltrados() {
    const filtro = this.filtroNombre.trim().toLowerCase();
    if (!filtro) return this.usuarios;
    
    return this.usuarios.filter(u =>
      (u.nombre?.toLowerCase().includes(filtro)) ||
      (u.apellido?.toLowerCase().includes(filtro)) ||
      (u.correo?.toLowerCase().includes(filtro))
    );
  }

}
