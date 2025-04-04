import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LaboratorioService } from '../../services/Laboratorio.service';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-laboratorios',
  imports: [SharedModule],
  templateUrl: './laboratorios.component.html',
  styleUrl: './laboratorios.component.css'
})
export class LaboratoriosComponent implements OnInit {
  
  LaboratorioData: any;


  constructor(private laboratorioService: LaboratorioService,
    private changeDetectorRef: ChangeDetectorRef
  ) {

    
  }


  ngOnInit(): void {
    
    this.laboratorioService.GetLaboratorios().subscribe((res: any) => {
      this.LaboratorioData = res.dataList.length > 0 ? res.dataList : [];
      console.log(this.LaboratorioData);
      this.changeDetectorRef.detectChanges();
    });
  }

}
