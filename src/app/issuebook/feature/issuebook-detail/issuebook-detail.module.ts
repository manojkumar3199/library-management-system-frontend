import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IssuebookDetailRoutingModule } from './issuebook-detail-routing.module';
import { IssuebookDetailComponent } from './issuebook-detail.component';


@NgModule({
  declarations: [
    IssuebookDetailComponent
  ],
  imports: [
    CommonModule,
    IssuebookDetailRoutingModule
  ]
})
export class IssuebookDetailModule { }
