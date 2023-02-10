import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatStepper } from '@angular/material/stepper';
import { CategoryService } from 'src/app/category/data-access/category.service';
import { Book } from 'src/app/shared/data-access/book';
import { Category } from 'src/app/shared/data-access/category';
import { StoreService } from 'src/app/shared/store/store.service';
import { BookService } from '../../data-access/book.service';

@Component({
  selector: 'app-book-add',
  templateUrl: './book-add.component.html',
  styleUrls: ['./book-add.component.css']
})
export class BookAddComponent implements OnInit {
  public categories: Category[] = [];
  public selectedFile: File | null = null;
  public error: HttpErrorResponse | null = null;
  public loaded = false;

  public firstStep = true;
  public secondStep = true;

  public addNewBookForm!: FormGroup;
  @ViewChild("formGroupDirective") private formGroupDirective!: FormGroupDirective;

  public currentSavedBook: Book | null = null;

  constructor(private categoryService: CategoryService, private bookService: BookService, private storeService: StoreService, private fb: FormBuilder, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    if (!this.storeService.loaded) {
      this.categoryService.getCategories().subscribe({
        next: data => {
          this.storeService.setCategories(data);
          this.categories = data;
          this.loaded = true;
        },
        error: error => {
          console.log(error);
          this.error = error;
        }
      });
    } else {
      this.storeService.loadCategories().subscribe(categories => {
        this.categories = categories;
        this.loaded = true;
      });
    }

    this.addNewBookForm = this.fb.group({
      category: [null, Validators.required],
      title: ["", [Validators.required, Validators.minLength(3)]],
      author: ["", [Validators.required, Validators.minLength(3)]],
      description: [null]
    });
  }

  get getBookCategory() {
    return this.addNewBookForm.get("category");
  }

  get getBookTitle() {
    return this.addNewBookForm.get("title");
  }

  get getBookAuthor() {
    return this.addNewBookForm.get("author");
  }

  public saveNewBook(stepper: MatStepper): void {
    if (this.error !== null)
      this.error = null;

    if (typeof this.addNewBookForm.value.category === 'string') {
      this.addNewBookForm.value.category = JSON.parse(this.addNewBookForm.value.category);
    }
    let newBook = this.addNewBookForm.value as Book;

    this.bookService.saveNewBook(newBook).subscribe({
      next: data => {
        this._snackBar.open(data.title + " added successfully!", "", { duration: 3000 });
        this.storeService.addBook(data);
        this.currentSavedBook = data;
        this.firstStep = false;
        stepper.next();
      },
      error: error => {
        console.log(error);
        this.error = error;
      }
    });
  }

  public reset(stepper: MatStepper): void {
    stepper.reset();
    this.formGroupDirective.resetForm();
    this.error = null;
  }

  public onFileSelect(event: any): void {
    this.selectedFile = event.target.files[0] ?? null;
  }

  public saveBookImage(stepper: MatStepper): void {
    if (this.error !== null)
      this.error = null;

    let bookId = this.currentSavedBook?.id as number;
    let bookImage = this.selectedFile as File;
    this.bookService.saveBookImage(bookId, bookImage).subscribe({
      next: data => {
        this._snackBar.open("Image Uploaded Successfully!", "", { duration: 3000 });
        this.secondStep = false;
        stepper.next();
      },
      error: error => {
        console.log(error);
        this.error = error;
      }
    });
  }

  public skipImageUploading(stepper: MatStepper) {
    if (this.error !== null)
      this.error = null;

    this.secondStep = false;
    stepper.next();
  }
}