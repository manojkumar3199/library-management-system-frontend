import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { CategoryListRoutingModule } from './category-list-routing.module';
import { MatSortModule } from '@angular/material/sort';

import { DeleteDialogComponent } from 'src/app/shared/ui/delete-dialog/delete-dialog.component';
import { CategoryListComponent } from './category-list.component';


@NgModule({
  declarations: [
    CategoryListComponent,
    DeleteDialogComponent
  ],
  imports: [
    CommonModule,
    CategoryListRoutingModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatDialogModule,
    MatSortModule
  ],
  exports: [CategoryListComponent]
})
export class CategoryListModule { }
