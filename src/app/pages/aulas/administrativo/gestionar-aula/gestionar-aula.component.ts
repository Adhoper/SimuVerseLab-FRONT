import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SharedModule } from '../../../../shared/shared.module';

@Component({
  selector: 'app-gestionar-aula',
  imports: [SharedModule],
  templateUrl: './gestionar-aula.component.html',
  styleUrl: './gestionar-aula.component.css'
})
export class GestionarAulaComponent {
  aulaForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<GestionarAulaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.aulaForm = this.fb.group({
      nombre: [data?.nombre || '', Validators.required],
    });
  }

  guardar() {
    if (this.aulaForm.valid) {
      this.dialogRef.close(this.aulaForm.value);
    }
  }

  cancelar() {
    this.dialogRef.close();
  }

}
