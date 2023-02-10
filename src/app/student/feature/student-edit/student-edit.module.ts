import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentEditRoutingModule } from './student-edit-routing.module';
import { StudentEditComponent } from './student-edit.component';


@NgModule({
  declarations: [
    StudentEditComponent
  ],
  imports: [
    CommonModule,
    StudentEditRoutingModule
  ]
})
export class StudentEditModule { }
