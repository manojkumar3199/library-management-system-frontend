import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'add',
    loadChildren: () => import('../student-add/student-add.module').then(m => m.StudentAddModule)
  },
  {
    path: 'list',
    loadChildren: () => import('../student-list/student-list.module').then(m => m.StudentListModule)
  },
  {
    path: 'edit/:id',
    loadChildren: () => import('../student-edit/student-edit.module').then(m => m.StudentEditModule)
  },
  {
    path: 'detail/:id',
    loadChildren: () => import('../student-detail/student-detail.module').then(m => m.StudentDetailModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentShellRoutingModule { }
