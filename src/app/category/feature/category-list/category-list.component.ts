import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Category } from 'src/app/shared/data-access/category';
import { StoreService } from 'src/app/shared/store/store.service';
import { DeleteDialogComponent } from 'src/app/shared/ui/delete-dialog/delete-dialog.component';
import { CategoryService } from '../../data-access/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit, AfterViewInit {

  @ViewChild(MatSort) public sort!: MatSort;

  public categories = new MatTableDataSource<Category>;
  public error: HttpErrorResponse | null = null;

  public displayedColumns: string[] = ['id', 'categoryName', 'shortName', 'action'];

  constructor(private categoryService: CategoryService, private storeService: StoreService, private router: Router, private _snackBar: MatSnackBar, private _dialog: MatDialog, private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    if (!this.storeService.loaded) {
      this.categoryService.getCategories().subscribe({
        next: data => {
          this.storeService.setCategories(data);
        },
        error: error => {
          console.log(error);
          this.error = error;
        }
      });
    }
    this.storeService.loadCategories().subscribe(categories => this.categories.data = categories);
  }

  ngAfterViewInit(): void {
    this.categories.sort = this.sort;
    console.log(this.sort);
    this.cdRef.detectChanges();
  }

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.categories.filter = filterValue.trim().toLowerCase();
  }

  public deleteCategory(savedCategory: Category) {
    let deleteDialogRef = this._dialog.open(DeleteDialogComponent, { data: { type: "book category", name: savedCategory.categoryName } });
    deleteDialogRef.afterClosed().subscribe(result => {
      if (result === "cancel" || result === undefined) {
        console.log("cancling delete operation!");
      } else {
        this.categoryService.deleteCategory(savedCategory.id).subscribe({
          next: data => {
            this.storeService.removeCategory(savedCategory.id);
            this.storeService.decrementCategory();
            this._snackBar.open(savedCategory.categoryName + " deleted successfully!", "", { duration: 3000 })
          },
          error: error => this.error = error
        });
      }
    });
  }

  public editCategory(savedCategory: Category) {
    this.router.navigate(["category/edit", savedCategory.id]);
  }

}
