import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "add",
    loadChildren: () => import("../book-add/book-add.module")
      .then(m => m.BookAddModule)
  },
  {
    path: 'list',
    loadChildren: () => import('../book-list/book-list.module')
      .then(m => m.BookListModule)
  },
  { path: 'edit/:id', loadChildren: () => import('../book-edit/book-edit.module').then(m => m.BookEditModule) },
  { path: 'detail/:id', loadChildren: () => import('../book-detail/book-detail.module').then(m => m.BookDetailModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookShellRoutingModule { }
