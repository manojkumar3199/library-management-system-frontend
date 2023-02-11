import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  public editBookForm!: FormGroup;
  public categories!: Category[];
  public selectedCategory: Category = {id: 68, categoryName: ""};
  public savedBook!: Book;
  public error: HttpErrorResponse | null = null;


  constructor(private activatedRoute: ActivatedRoute, private bookService: BookService, private fb: FormBuilder, private categoryService: CategoryService, private storeService: StoreService) { }

  ngOnInit(): void {
    this.editBookForm = this.fb.group({
      category: [null, Validators.required],
      title: ["", [Validators.required, Validators.minLength(3)]],
      author: ["", [Validators.required, Validators.minLength(3)]],
      description: [null]
    });

    //loading all categories
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
    }

    //loading book by id
    let bookId: number = Number(this.activatedRoute.snapshot.paramMap.get("id"));
    this.bookService.getBookById(bookId).subscribe({
      next: data => {
        this.savedBook = data;
        this.fetchValues(data);
      },
      error: error => {
        console.log(error);
        this.error = error;
      }
    });
  }

  public fetchValues(savedBook: Book): void {
    this.editBookForm.setValue({
      category: savedBook.category,
      title: savedBook.title,
      author: savedBook.author,
      description: savedBook.description
    });
    this.selectedCategory = savedBook.category;
  }

  public updateBook(selectedCategory: Category): void {
    console.log(this.editBookForm.value);
    console.log(selectedCategory);
  }

  public reset(): void {
  }
}
