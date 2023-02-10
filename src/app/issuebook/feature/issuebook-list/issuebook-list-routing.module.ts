import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IssuebookListComponent } from './issuebook-list.component';

const routes: Routes = [{ path: '', component: IssuebookListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IssuebookListRoutingModule { }
