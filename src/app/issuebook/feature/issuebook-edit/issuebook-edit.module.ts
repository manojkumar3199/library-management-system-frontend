import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IssuebookEditRoutingModule } from './issuebook-edit-routing.module';
import { IssuebookEditComponent } from './issuebook-edit.component';


@NgModule({
  declarations: [
    IssuebookEditComponent
  ],
  imports: [
    CommonModule,
    IssuebookEditRoutingModule
  ]
})
export class IssuebookEditModule { }
