import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IssuebookEditComponent } from './issuebook-edit.component';

const routes: Routes = [{ path: '', component: IssuebookEditComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IssuebookEditRoutingModule { }
