import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AulaService } from '../../../../services/Aula.service';
import { SharedModule } from '../../../../shared/shared.module';
import { LoaderService } from '../../../../services/loader.service';
import Swal from 'sweetalert2';
import { AuthService } from '../../../../services/AuthService.service';

@Component({
  selector: 'app-gestionar-aula',
  imports: [SharedModule],
  templateUrl: './gestionar-aula.component.html',
  styleUrl: './gestionar-aula.component.css'
})
export class GestionarAulaComponent implements OnInit {
  aulaForm: FormGroup;
  user: any;

  constructor(
    private fb: FormBuilder,
    private aulaService: AulaService,
    private authService: AuthService,
    private loader: LoaderService,
    public dialogRef: MatDialogRef<GestionarAulaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.aulaForm = this.fb.group({
      nombreAula: [data?.nombre || '', Validators.required],
      capacidad: [data?.capacidad || '', [Validators.required, Validators.min(1)]]
    });
  }
  ngOnInit(): void {
    this.user = this.authService.getUsuario();
  }

  guardar() {
    
    if (this.aulaForm.valid) {
      const formData = this.aulaForm.value;
      this.loader.show();

      if (this.data && this.data.idAula) {
        // 🔵 Editar
        const actualizarData = {
          idAula: this.data.idAula,
          nombreAula: formData.nombreAula,
          capacidad: formData.capacidad,
          estatus: this.data.estatus || 'Activo'
        };

        this.aulaService.EditarAula(actualizarData).subscribe({
          next: (res: any) => {
            this.loader.hide();
            if (res.successful) {
              Swal.fire('¡Actualizado!', 'El aula se actualizó correctamente.', 'success');
              this.dialogRef.close(true);
            } else {
              Swal.fire('Error', res.message || 'No se pudo actualizar el aula.', 'error');
            }
          },
          error: (err) => {
            this.loader.hide();
            console.error('Error al actualizar aula:', err);
            Swal.fire('Error', 'Hubo un error inesperado.', 'error');
          }
        });
      } else {
        // 🟢 Crear
        const crearData = {
          nombreAula: formData.nombreAula,
          capacidad: formData.capacidad,
          idInstitucion: this.user.idInstitucion
        };

        this.aulaService.CrearAula(crearData).subscribe({
          next: (res: any) => {
            this.loader.hide();
            if (res.successful) {
              Swal.fire('¡Creado!', 'El aula se creó correctamente.', 'success');
              this.dialogRef.close(true);
            } else {
              Swal.fire('Error', res.message || 'No se pudo crear el aula.', 'error');
            }
          },
          error: (err) => {
            this.loader.hide();
            console.error('Error al crear aula:', err);
            Swal.fire('Error', 'Hubo un error inesperado.', 'error');
          }
        });
      }
    }
  }

  cancelar() {
    this.dialogRef.close();
  }
}
