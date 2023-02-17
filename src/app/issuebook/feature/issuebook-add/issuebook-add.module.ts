import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IssuebookAddRoutingModule } from './issuebook-add-routing.module';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { IssuebookAddComponent } from './issuebook-add.component';


@NgModule({
  declarations: [
    IssuebookAddComponent
  ],
  imports: [
    CommonModule,
    IssuebookAddRoutingModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatCheckboxModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSnackBarModule
  ]
})
export class IssuebookAddModule { }
