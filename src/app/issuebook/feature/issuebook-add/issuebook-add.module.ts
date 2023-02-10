import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IssuebookAddRoutingModule } from './issuebook-add-routing.module';
import { IssuebookAddComponent } from './issuebook-add.component';


@NgModule({
  declarations: [
    IssuebookAddComponent
  ],
  imports: [
    CommonModule,
    IssuebookAddRoutingModule
  ]
})
export class IssuebookAddModule { }
