import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { HeroSectionComponent } from './hero-section/hero-section.component';
//import { SelectDropDownModule } from 'ngx-select-dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
//import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
//import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    //SelectDropDownModule,
    FormsModule,
    RouterModule,
    //MatDialogModule,
    HttpClientModule,
    ReactiveFormsModule,
    //NgxMaskDirective,
    //NgxMaskPipe
  ],
  exports: [
    CommonModule,
    //SelectDropDownModule,
    FormsModule,
    RouterModule,
    //MatDialogModule,
    ReactiveFormsModule,
    //NgxMaskDirective,
    //NgxMaskPipe
  ]
})
export class SharedModule { }
