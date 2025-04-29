import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { HeroSectionComponent } from './hero-section/hero-section.component';
//import { SelectDropDownModule } from 'ngx-select-dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { NgxEchartsModule } from 'ngx-echarts';
// import echarts core
import * as echarts from 'echarts/core';
// import necessary echarts components
import { BarChart } from 'echarts/charts';
import { GridComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
echarts.use([BarChart, GridComponent, CanvasRenderer]);



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    //SelectDropDownModule,
    FormsModule,
    RouterModule,
    MatDialogModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxEchartsModule.forRoot({ echarts }),
    //NgxMaskDirective,
    //NgxMaskPipe
  ],
  exports: [
    CommonModule,
    //SelectDropDownModule,
    FormsModule,
    RouterModule,
    MatDialogModule,
    ReactiveFormsModule,
    //NgxMaskDirective,
    //NgxMaskPipe
  ]
})
export class SharedModule { }
