import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IssuebookListRoutingModule } from './issuebook-list-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatTooltipModule } from '@angular/material/tooltip';

import { IssuebookListComponent } from './issuebook-list.component';


@NgModule({
  declarations: [
    IssuebookListComponent
  ],
  imports: [
    CommonModule,
    IssuebookListRoutingModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatDialogModule,
    MatSortModule,
    MatTooltipModule
  ]
})
export class IssuebookListModule { }
