import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentDetailRoutingModule } from './student-detail-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { StudentDetailComponent } from './student-detail.component';


@NgModule({
  declarations: [
    StudentDetailComponent
  ],
  imports: [
    CommonModule,
    StudentDetailRoutingModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class StudentDetailModule { }
