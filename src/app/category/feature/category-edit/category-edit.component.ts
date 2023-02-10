import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/shared/data-access/category';
import { StoreService } from 'src/app/shared/store/store.service';
import { CategoryService } from '../../data-access/category.service';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent implements OnInit {
  @ViewChild("formGroupDirective") formGroupDirective!: FormGroupDirective;

  public editCategoryForm!: FormGroup;

  public savedCategory!: Category;
  public error: HttpErrorResponse | null = null;

  public loaded = false;


  constructor(private activatedRoute: ActivatedRoute, private categoryService: CategoryService, private storeService: StoreService, private fb: FormBuilder, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.editCategoryForm = this.fb.group({
      id: [""],
      categoryName: ["", [Validators.required, Validators.minLength(3)]],
      shortName: ["", [Validators.required]]
    });

    this.getCategoryById();
  }

  private getCategoryById(): void {
    let categoryId: number = Number(this.activatedRoute.snapshot.paramMap.get("id"));
    this.categoryService.getCategoryById(categoryId).subscribe({
      next: data => {
        this.savedCategory = data;
        this.fetchValues(data);
        this.loaded = true;
      },
      error: error => {
        console.log(error);
        this.error = error;
      }
    });
  }

  get getCategoryName() {
    return this.editCategoryForm.get("categoryName");
  }

  get getShortName() {
    return this.editCategoryForm.get("shortName");
  }

  public fetchValues(savedcategory: Category): void {
    this.editCategoryForm.setValue({
      id: savedcategory.id,
      categoryName: savedcategory.categoryName,
      shortName: savedcategory.shortName
    });
  }

  public updateCategory(): void {
    if (this.error !== null)
      this.error = null;

    let modifiedCategory: Category = this.editCategoryForm.value;
    this.categoryService.updateCategory(modifiedCategory).subscribe({
      next: data => {
        this._snackBar.open("book category with id: " + data.id + " updated successfully!", "", { duration: 3000 });
        this.storeService.modifyCategory(data);
        this.savedCategory = data;
      },
      error: error => {
        console.log(error);
        this.error = error;
      }
    });
  }

  public reset(): void {
    this.formGroupDirective.resetForm();
    this.error = null;
    this.fetchValues(this.savedCategory);
  }

}