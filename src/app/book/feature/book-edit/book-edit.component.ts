import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/category/data-access/category.service';
import { Book } from 'src/app/shared/data-access/book';
import { Category } from 'src/app/shared/data-access/category';
import { StoreService } from 'src/app/shared/store/store.service';
import { BookService } from '../../data-access/book.service';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css']
})
export class BookEditComponent implements OnInit {
  @ViewChild("formGroupDirective") public formGroupDirective!: FormGroupDirective;
  @ViewChild("fileInput") public fileInput!: ElementRef;

  public editBookForm!: FormGroup;
  public categories!: Category[];
  public savedBook!: Book;
  public error: HttpErrorResponse | null = null;
  public loaded = false;

  public imageSrc!: string;
  public selectedFile: File | null = null;


  constructor(private activatedRoute: ActivatedRoute, private bookService: BookService, private fb: FormBuilder, private categoryService: CategoryService, private storeService: StoreService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.editBookForm = this.fb.group({
      id: [null, Validators.required],
      category: [null, Validators.required],
      title: ["", [Validators.required, Validators.minLength(3)]],
      author: ["", [Validators.required, Validators.minLength(3)]],
      description: [null]
    });

    //loading book by id
    let bookId: number = Number(this.activatedRoute.snapshot.paramMap.get("id"));
    this.bookService.getBookById(bookId).subscribe({
      next: data => {
        this.savedBook = data;
        this.imageSrc = data.imageUrl || "assets/images/default-book-image.jpg";
        this.fetchValues(data);
        this.loadCategories();
        this.loaded = true;
      },
      error: error => {
        console.log(error);
        this.error = error;
      }
    });
  }

  public loadCategories(): void {
    if (!this.storeService.loaded) {
      this.categoryService.getCategories().subscribe({
        next: data => {
          this.categories = data;
          this.storeService.setCategories(data);
        },
        error: error => {
          console.log(error);
          this.error = error;
        }
      });
    } else {
      this.storeService.loadCategories().subscribe(categories => this.categories = categories);
    }
  }

  public fetchValues(savedBook: Book): void {
    this.editBookForm.setValue({
      id: savedBook.id,
      category: savedBook.category,
      title: savedBook.title,
      author: savedBook.author,
      description: savedBook.description
    });
  }

  public updateBook(): void {
    if (this.error !== null)
      this.error = null;

    let modifiedBook = this.editBookForm.value as Book;
    this.bookService.updateBook(modifiedBook).subscribe({
      next: data => {
        this.savedBook = data;
        this.storeService.modifyBook(data);
        this._snackBar.open(data.title + " updated successfully!", "", { duration: 3000 });

        //reseting form
        this.formGroupDirective.resetForm();
        this.fetchValues(this.savedBook);
      },
      error: error => {
        console.log(error);
        this.error = error;
      }
    });
  }

  public reset(): void {
    this.formGroupDirective.resetForm();
    this.fileInput.nativeElement.value = "";
    this.selectedFile = null;
    this.error = null;
    this.imageSrc = this.savedBook.imageUrl || "assets/images/default-book-image.jpg";
    this.fetchValues(this.savedBook);
  }

  public compareCategories(c1: Category, c2: Category): boolean {
    return c1 && c2 && c1.id === c2.id;
  }

  public onFileSelect(event: any): void {
    if (event.target.files) {
      this.selectedFile = event.target.files[0];
      let reader = new FileReader();
      reader.onload = (event: any) => {
        this.imageSrc = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  public updateImage() {
    console.log(this.selectedFile);
    let bookId = this.savedBook.id;
    let bookImage = this.selectedFile as File;
    this.bookService.saveBookImage(bookId, bookImage).subscribe({
      next: data => {
        this.savedBook.imageUrl = data.imageUrl;
        this.storeService.addBookImage(bookId, data);
        this._snackBar.open("Image updated successfully!", "", { duration: 3000 });

        //reseting image
        this.fileInput.nativeElement.value = "";
        this.selectedFile = null;
      }
    });
  }

  public setDefaultImage(event: any): void {
    if (event.target.src)
      event.target.src = "assets/images/default-book-image.jpg";
  }

  get getBookTitle() {
    return this.editBookForm.get("title");
  }

  get getBookAuthor() {
    return this.editBookForm.get("author");
  }

  get getBookCategory() {
    return this.editBookForm.get("category");
  }

  get getBookId() {
    return this.editBookForm.get("id");
  }
}
