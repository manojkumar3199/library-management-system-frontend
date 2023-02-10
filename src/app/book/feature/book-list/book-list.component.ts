import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Book } from 'src/app/shared/data-access/book';
import { StoreService } from 'src/app/shared/store/store.service';
import { DeleteDialogComponent } from 'src/app/shared/ui/delete-dialog/delete-dialog.component';
import { BookService } from '../../data-access/book.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent {
  @ViewChild(MatSort) public sort!: MatSort;

  public books = new MatTableDataSource<Book>;
  public error: HttpErrorResponse | null = null;

  public displayedColumns: string[] = ['id', 'title', 'author', 'category' ,'action'];

  constructor(private bookService: BookService, private storeService: StoreService, private router: Router, private _snackBar: MatSnackBar, private _dialog: MatDialog, private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    if (!this.storeService.booksLoaded) {
      this.bookService.getAllBooks().subscribe({
        next: data => {
          this.storeService.setBooks(data);
          this.books.data = data;
        },
        error: error => {
          console.log(error);
          this.error = error;
        }
      });
    } else {
      this.storeService.loadBooks().subscribe(books => this.books.data = books);
    }
  }

  ngAfterViewInit(): void {
    this.books.sort = this.sort;
    console.log(this.sort);
    this.cdRef.detectChanges();
  }

  public applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.books.filter = filterValue.trim().toLowerCase();
  }

  public deleteBook(savedBook: Book): void {
    let deleteDialogRef = this._dialog.open(DeleteDialogComponent, { data: { type: "book", name: savedBook.title } });
    deleteDialogRef.afterClosed().subscribe(result => {
      if (result === "cancel" || result === undefined) {
        console.log("cancling delete operation!");
      } else {
        this.bookService.deleteBook(savedBook.id).subscribe({
          next: data => {
            this.storeService.removeBook(savedBook.id);
            this._snackBar.open(savedBook.title + " deleted successfully!", "", { duration: 3000 })
          },
          error: error => this.error = error
        });
      }
    });
  }

  public editBook(savedBook: Book) {
    this.router.navigate(["book/edit", savedBook.id]);
  }
}
