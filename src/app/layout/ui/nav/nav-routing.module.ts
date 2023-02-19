import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: 'category',
        loadChildren: () => import('../../../category/feature/category-shell/category-shell.module')
            .then(m => m.CategoryShellModule)
    },
    {
        path: 'book',
        loadChildren: () => import('../../../book/feature/book-shell/book-shell.module')
            .then(m => m.BookShellModule)
    },
    {
        path: 'student',
        loadChildren: () => import('../../../student/feature/student-shell/student-shell.module')
            .then(m => m.StudentShellModule)
    },
    {
        path: 'issuebook',
        loadChildren: () => import('../../../issuebook/feature/issuebook-shell/issuebook-shell.module')
            .then(m => m.IssuebookShellModule)
    },
    {
        path: '',
        loadChildren: () => import('../../../home/feature/stats/stats.module')
            .then(m => m.StatsModule)
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class NavRoutingModule { }
