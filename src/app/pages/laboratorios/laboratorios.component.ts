import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LaboratorioService } from '../../services/Laboratorio.service';
import { SharedModule } from '../../shared/shared.module';
import { MatDialog } from '@angular/material/dialog';
import { VerExperimentosComponent } from './ver-experimentos/ver-experimentos.component';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-laboratorios',
  imports: [SharedModule],
  templateUrl: './laboratorios.component.html',
  styleUrl: './laboratorios.component.css'
})
export class LaboratoriosComponent implements OnInit {
  
  LaboratorioData: any;


  constructor(private laboratorioService: LaboratorioService,
    private changeDetectorRef: ChangeDetectorRef,
    private dialog: MatDialog,
    private loader: LoaderService
  ) {

    
  }
  
  ngOnInit(): void {
    
    this.loader.show(); // Mostrar el loading

    this.laboratorioService.GetLaboratorios().subscribe({
      next: (res: any) => {
        this.LaboratorioData = res.dataList.length > 0 ? res.dataList : [];
        this.changeDetectorRef.detectChanges();
        this.loader.hide(); // Ocultar loading en caso exitoso
      },
      error: (err) => {
        console.error('Error al obtener los laboratorios', err);
        this.loader.hide(); // Ocultar loading en caso de error también
      }
    });
    
  }

  verExperimentos(laboratorio: any): void {
    this.dialog.open(VerExperimentosComponent, {
      width: '600px',
      data: laboratorio
    });
  }

}
