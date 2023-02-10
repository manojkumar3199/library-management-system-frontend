import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IssuebookDetailComponent } from './issuebook-detail.component';

const routes: Routes = [{ path: '', component: IssuebookDetailComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IssuebookDetailRoutingModule { }
