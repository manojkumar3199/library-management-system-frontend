import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookAddRoutingModule } from './book-add-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { BookAddComponent } from './book-add.component';


@NgModule({
  declarations: [
    BookAddComponent
  ],
  imports: [
    CommonModule,
    BookAddRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatStepperModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatSnackBarModule
  ]
})
export class BookAddModule { }
