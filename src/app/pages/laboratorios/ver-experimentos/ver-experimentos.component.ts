import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SharedModule } from '../../../shared/shared.module';
import { ExperimentoService } from '../../../services/experimento.service';
import { LoaderService } from '../../../services/loader.service';

@Component({
  selector: 'app-ver-experimentos',
  imports: [SharedModule],
  templateUrl: './ver-experimentos.component.html',
  styleUrl: './ver-experimentos.component.css'
})
export class VerExperimentosComponent {

  laboratorio: any;
  experimentos: any[] = [];


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<VerExperimentosComponent>,
    private experimentoService: ExperimentoService,
    private changeDetectorRef: ChangeDetectorRef,
    private loader: LoaderService
  ) {}

  ngOnInit(): void {
    this.laboratorio = this.data;
    this.obtenerExperimentos(this.laboratorio.idLaboratorio);
  }

  obtenerExperimentos(idLaboratorio: number): void {
    this.loader.show();
    this.experimentoService.GetExperimento(idLaboratorio).subscribe({
      next: (res: any) => {
        this.experimentos = res.dataList || [];
        this.loader.hide();
      },
      error: (error) => {
        console.error('Error al cargar los experimentos', error);
        this.loader.hide();
      }
    });

    this.changeDetectorRef.detectChanges();
  }

  cerrar(): void {
    this.dialogRef.close();
  }

}
