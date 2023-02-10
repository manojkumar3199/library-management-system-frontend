import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IssuebookAddComponent } from './issuebook-add.component';

const routes: Routes = [{ path: '', component: IssuebookAddComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IssuebookAddRoutingModule { }
