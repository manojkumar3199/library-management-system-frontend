import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookEditRoutingModule } from './book-edit-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';

import { BookEditComponent } from './book-edit.component';


@NgModule({
  declarations: [
    BookEditComponent
  ],
  imports: [
    CommonModule,
    BookEditRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule
  ]
})
export class BookEditModule { }
