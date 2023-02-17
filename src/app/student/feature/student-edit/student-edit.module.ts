import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { StudentEditRoutingModule } from './student-edit-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';


import { StudentEditComponent } from './student-edit.component';


@NgModule({
  declarations: [
    StudentEditComponent
  ],
  imports: [
    CommonModule,
    StudentEditRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule
  ]
})
export class StudentEditModule { }
