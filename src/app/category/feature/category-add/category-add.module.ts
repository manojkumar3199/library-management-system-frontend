import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryAddRoutingModule } from './category-add-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';


import { CategoryAddComponent } from './category-add.component';


@NgModule({
  declarations: [
    CategoryAddComponent
  ],
  imports: [
    CommonModule,
    CategoryAddRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSnackBarModule
  ],
  exports: [CategoryAddComponent]
})
export class CategoryAddModule { }
