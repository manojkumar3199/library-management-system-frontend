import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Issuebook } from 'src/app/shared/data-access/issuebook';
import { StoreService } from 'src/app/shared/store/store.service';
import { IssuebookService } from '../../data-access/issuebook.service';

@Component({
  selector: 'app-issuebook-list',
  templateUrl: './issuebook-list.component.html',
  styleUrls: ['./issuebook-list.component.css']
})
export class IssuebookListComponent implements OnInit {

  @ViewChild(MatSort) public sort!: MatSort;

  public issuedBooks = new MatTableDataSource<Issuebook>;
  public error: HttpErrorResponse | null = null;

  public displayedColumns: string[] = ['issueId', 'student', 'book', 'issueDate', 'expiringDate', 'action'];

  constructor(private issuebookService: IssuebookService, private storeService: StoreService, private cdRef: ChangeDetectorRef, private _snackBar: MatSnackBar, private _dialog: MatDialog) { }

  ngOnInit(): void {
    if (!this.storeService.issuedBooksLoaded) {
      this.issuebookService.getAllIssuedBooks().subscribe({
        next: data => {
          this.storeService.loadIssuedBooks(data);
        },
        error: error => {
          console.log(error);
          this.error = error;
        }
      });
    }
    this.storeService.currentIssuedBooks$.subscribe(issuedBooks => this.issuedBooks.data = issuedBooks);
  }

  ngAfterViewInit(): void {
    this.issuedBooks.sort = this.sort;
    console.log(this.sort);
    this.cdRef.detectChanges();
  }

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.issuedBooks.filter = filterValue.trim().toLowerCase();
  }

  public returnBook(issuedBook: Issuebook) {
    let studentId = issuedBook.student.id;
    let bookId = issuedBook.book.id;
    this.issuebookService.returnBook(studentId, bookId).subscribe({
      next: data => {
        this.storeService.removeIssuedBook(issuedBook.id);
        let book = issuedBook.book;
        book.reserved = false;
        this.storeService.modifyBook(book);
        this._snackBar.open("Book Returned successfully!", "", { duration: 3000 })
      },
      error: error => this.error = error
    });
  }
}
