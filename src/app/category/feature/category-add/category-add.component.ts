import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Category } from 'src/app/shared/data-access/category';
import { StoreService } from 'src/app/shared/store/store.service';
import { CategoryService } from '../../data-access/category.service';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.css']
})
export class CategoryAddComponent implements OnInit {

  @ViewChild("formGroupDirective") formGroupDirective!: FormGroupDirective;

  public categoryForm!: FormGroup;
  public error: HttpErrorResponse | null = null;

  constructor(private fb: FormBuilder, private categoryService: CategoryService, private storeService: StoreService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      categoryName: ["", [Validators.required, Validators.minLength(3)]],
      shortName: ["", Validators.required]
    });
  }

  get getCategoryName() {
    return this.categoryForm.get("categoryName");
  }

  get getShortName() {
    return this.categoryForm.get("shortName");
  }

  public saveNewCategory() {
    if (this.error !== null)
      this.error = null;

    let newCategory: Category = this.categoryForm.value;
    this.categoryService.saveNewCategory(newCategory).subscribe({
      next: data => {
        this.storeService.addCategory(data);
        this.storeService.incrementCategory();
        this._snackBar.open(newCategory.categoryName + " added successfully!", "", { duration: 3000 });
      },
      error: error => this.error = error
    });
  }

  public reset(): void {
    this.formGroupDirective.resetForm();
    this.error = null;
  }

}
