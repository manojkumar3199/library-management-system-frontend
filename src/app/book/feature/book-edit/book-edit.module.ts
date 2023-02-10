import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookEditRoutingModule } from './book-edit-routing.module';
import { BookEditComponent } from './book-edit.component';


@NgModule({
  declarations: [
    BookEditComponent
  ],
  imports: [
    CommonModule,
    BookEditRoutingModule
  ]
})
export class BookEditModule { }
