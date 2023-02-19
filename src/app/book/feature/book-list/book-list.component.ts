import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Book } from 'src/app/shared/data-access/book';
import { StoreService } from 'src/app/shared/store/store.service';
import { DeleteDialogComponent } from 'src/app/shared/ui/delete-dialog/delete-dialog.component';
import { BookService } from '../../data-access/book.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  public error: HttpErrorResponse | null = null;
  public books$!: Observable<Book[]>;

  public searchKey!: string;

  constructor(private bookService: BookService, private storeService: StoreService, private _snackBar: MatSnackBar, private _dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    if (!this.storeService.booksLoaded) {
      this.bookService.getAllBooks().subscribe({
        next: data => {
          this.storeService.loadBooks(data);
        },
        error: error => {
          console.log(error);
          this.error = error;
        }
      });
    }
    this.books$ = this.storeService.currentBooks$;
  }

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.searchKey = filterValue;
  }

  public deleteBook(savedBook: Book): void {
    this._dialog.open(DeleteDialogComponent, { data: { type: "book", name: savedBook.title } }).afterClosed().subscribe(result => {
      if (result === "cancel" || result === undefined) {
        console.log("canceling delete operation!");
      } else {
        this.bookService.deleteBook(savedBook.id).subscribe({
          next: data => {
            this.storeService.removeBook(savedBook.id);
            this.storeService.decrementBook();
            this._snackBar.open(savedBook.title + " deleted successfully!", "", { duration: 3000 });
          },
          error: error => {
            console.log(error);
            this.error = error;
          }
        });
      }
    });
  }

  public editBook(savedBook: Book): void {
    this.router.navigate(["book/edit", savedBook.id]);
  }

  public viewBook(savedBook: Book): void {
    this.router.navigate(["book/detail", savedBook.id]);
  }

  public setDefaultImage(event: any): void {
    if (event.target.src)
      event.target.src = "assets/images/default-book-image.jpg";
  }
}