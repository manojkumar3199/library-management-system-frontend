import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BookListRoutingModule } from './book-list-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';



import { BookListComponent } from './book-list.component';


@NgModule({
  declarations: [
    BookListComponent
  ],
  imports: [
    CommonModule,
    BookListRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class BookListModule { }
