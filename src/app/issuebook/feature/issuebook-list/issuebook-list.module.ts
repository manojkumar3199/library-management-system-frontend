import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IssuebookListRoutingModule } from './issuebook-list-routing.module';
import { IssuebookListComponent } from './issuebook-list.component';


@NgModule({
  declarations: [
    IssuebookListComponent
  ],
  imports: [
    CommonModule,
    IssuebookListRoutingModule
  ]
})
export class IssuebookListModule { }
