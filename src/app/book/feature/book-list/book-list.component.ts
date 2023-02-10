import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/shared/data-access/book';
import { StoreService } from 'src/app/shared/store/store.service';
import { BookService } from '../../data-access/book.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  public error: HttpErrorResponse | null = null;
  public books: Book[] = [];

  public defaultBookImage = "assets/images/default-book-image.jpg";

  constructor(private bookService: BookService, private storeService: StoreService) { }

  ngOnInit(): void {
    if (!this.storeService.booksLoaded) {
      this.bookService.getAllBooks().subscribe({
        next: data => {
          this.books = data;
          this.storeService.setBooks(data);
        },
        error: error => {
          console.log(error);
          this.error = error;
        }
      });
    } else {
      this.storeService.loadBooks().subscribe(books => this.books = books);
    }
  }

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue);
  }
}
