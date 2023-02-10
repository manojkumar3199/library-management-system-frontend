import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: 'add', loadChildren: () => import('../issuebook-add/issuebook-add.module').then(m => m.IssuebookAddModule) }, { path: 'list', loadChildren: () => import('../issuebook-list/issuebook-list.module').then(m => m.IssuebookListModule) }, { path: 'edit', loadChildren: () => import('../issuebook-edit/issuebook-edit.module').then(m => m.IssuebookEditModule) }, { path: 'detail', loadChildren: () => import('../issuebook-detail/issuebook-detail.module').then(m => m.IssuebookDetailModule) }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IssuebookShellRoutingModule { }
