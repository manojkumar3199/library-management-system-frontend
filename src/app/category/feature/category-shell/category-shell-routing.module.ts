import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'list',
    loadChildren: () => import("../category-list/category-list.module")
      .then(m => m.CategoryListModule)
  },
  {
    path: 'add',
    loadChildren: () => import("../category-add/category-add.module")
      .then(m => m.CategoryAddModule)
  },
  {
    path: 'edit/:id',
    loadChildren: () => import("../category-edit/category-edit.module")
      .then(m => m.CategoryEditModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryShellRoutingModule { }
