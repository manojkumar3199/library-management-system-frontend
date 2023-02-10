import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryEditRoutingModule } from './category-edit-routing.module';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';

import { CategoryEditComponent } from './category-edit.component';


@NgModule({
  declarations: [
    CategoryEditComponent
  ],
  imports: [
    CommonModule,
    CategoryEditRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    ReactiveFormsModule
  ]
})
export class CategoryEditModule { }
