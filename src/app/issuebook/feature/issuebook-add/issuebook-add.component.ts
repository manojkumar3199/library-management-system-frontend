import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BookService } from 'src/app/book/data-access/book.service';
import { CategoryService } from 'src/app/category/data-access/category.service';
import { Book } from 'src/app/shared/data-access/book';
import { Category } from 'src/app/shared/data-access/category';
import { Student } from 'src/app/shared/data-access/student';
import { StoreService } from 'src/app/shared/store/store.service';
import { StudentService } from 'src/app/student/data-access/student.service';
import { IssuebookService } from '../../data-access/issuebook.service';

@Component({
  selector: 'app-issuebook-add',
  templateUrl: './issuebook-add.component.html',
  styleUrls: ['./issuebook-add.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ]
})
export class IssuebookAddComponent implements OnInit {
  public sortList!: QueryList<MatSort>;
  @ViewChildren(MatSort) set matSort(ms: QueryList<MatSort>) {
    this.sortList = ms;
    if (this.students) {
      this.students.sort = this.sortList.toArray()[0];
    }
    if (this.categories) {
      this.categories.sort = this.sortList.toArray()[1];
    }
    if (this.relevantBooks) {
      this.relevantBooks.sort = this.sortList.toArray()[2];
    }
  }

  public error: HttpErrorResponse | null = null;

  constructor(private studentService: StudentService, private categoryService: CategoryService, private bookService: BookService, private storeServive: StoreService, private fb: FormBuilder, private issuebookService: IssuebookService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    //Student
    this.studentForm = this.fb.group({});
    if (!this.storeServive.studentsLoaded) {
      this.studentService.getAllStudents().subscribe({
        next: data => {
          this.storeServive.loadStudents(data);
          data.forEach(data => this.studentForm.addControl(String(data.id), this.fb.control(false, Validators.requiredTrue)));
        },
        error: error => {
          console.log(error);
          this.error = error;
        }
      });
    }
    this.storeServive.currentStudents$.subscribe(students => {
      this.students.data = students;
      students.forEach(student => this.studentForm.addControl(String(student.id), this.fb.control(false, Validators.requiredTrue)));
    });

    //book
    this.bookForm = this.fb.group({});
  }

  //Student
  public selectedStudent: Student | null = null;
  public students = new MatTableDataSource<Student>;
  public displayedStudentColumns: string[] = ['id', 'name', 'action'];
  public studentForm!: FormGroup;

  public applyStudentFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.students.filter = filterValue.trim().toLowerCase();
  }

  public onStudentSelect(selectedStudent: Student, event: MatCheckboxChange): void {
    if (event.checked) {
      this.selectedStudent = selectedStudent;
      this.students.data.forEach(student => {
        if (student.id !== selectedStudent.id)
          this.studentForm.get(String(student.id))?.disable();
      });
    } else {
      this.selectedStudent = null;
      this.students.data.forEach(student => this.studentForm.get(String(student.id))?.enable());
    }
    console.log(this.selectedStudent, event.checked);
  }

  //Category
  public selectedCategory: Category | null = null;
  public categories = new MatTableDataSource<Category>;
  public displayedCategoryColumns: string[] = ['id', 'categoryName', 'action'];
  public categoryForm!: FormGroup;

  public loadCategories(): void {
    if (this.error !== null)
      this.error = null;

    if (!this.storeServive.loaded) {
      this.categoryService.getCategories().subscribe({
        next: data => {
          this.storeServive.setCategories(data);
        },
        error: error => {
          console.log(error);
          this.error = error;
        }
      });
    }
    this.storeServive.loadCategories().subscribe(categories => this.categories.data = categories);
  }

  public applyCategoryFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.categories.filter = filterValue.trim().toLowerCase();
  }

  public onCategorySelect(selectedCategory: Category, event: MatCheckboxChange): void {
    if (event.checked) {
      this.selectedCategory = selectedCategory;
    } else {
      this.selectedCategory = null;
    }
    console.log(this.selectedCategory, event.checked);
  }

  //Book
  public relevantBooksCategoryName: string | null = null;
  public selectedBook: Book | null = null;
  public relevantBooks = new MatTableDataSource<Book>;
  public displayedBookColumns: string[] = ['id', 'title', 'action'];
  public bookForm!: FormGroup;
  @ViewChild("bookFormGroupDirective") public bookFormGroupDirective!: FormGroupDirective;

  public loadRelevantBooks(): void {
    if (this.error !== null)
      this.error = null;

    let categoryId = this.selectedCategory?.id as number;
    let categoryName = this.selectedCategory?.categoryName as string;
    this.bookService.getBooksByCategory(categoryId).subscribe({
      next: data => {
        if (this.relevantBooks.data.length) {
          this.relevantBooks.data.forEach(book => this.bookForm.removeControl(String(book.id)));
          this.selectedBook = null;
        }
        this.relevantBooks.data = data;
        this.relevantBooksCategoryName = categoryName;
        data.forEach(data => {
          this.bookForm.addControl(String(data.id), this.fb.control({ value: false, disabled: data.reserved }, Validators.requiredTrue));
        });
      },
      error: error => {
        console.log(error);
        this.error = error;
      }
    });
  }

  public applyBookFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.relevantBooks.filter = filterValue.trim().toLowerCase();
  }

  public onBookSelect(selectedBook: Book, event: MatCheckboxChange): void {
    if (event.checked) {
      this.selectedBook = selectedBook;
      this.relevantBooks.data.forEach(book => {
        if ((book.id !== selectedBook.id) && !book.reserved)
          this.bookForm.get(String(book.id))?.disable();
      });
    } else {
      this.selectedBook = null;
      this.relevantBooks.data.forEach(book => {
        if (!book.reserved)
          this.bookForm.get(String(book.id))?.enable()
      });
    }
    console.log(this.selectedBook, event.checked);
  }

  public issueBook(): void {
    let studentId = this.selectedStudent?.id as number;
    let bookId = this.selectedBook?.id as number;
    this.issuebookService.issueBook(studentId, bookId).subscribe({
      next: data => {
        data.student = this.selectedStudent as Student;
        this.storeServive.addIssuedBook(data);
        this.storeServive.modifyBook(data.book);
        this._snackBar.open("Booking Is Successful!", "", { duration: 3000 });
        //updating releventBooks array & checkboxes <-- refector this in feature
        this.relevantBooks.data.map(book => {
          if (book.id === this.selectedBook?.id) {
            book.reserved = data.book.reserved;
            this.bookForm.get(String(book.id))?.setValue(false);
            this.bookForm.get(String(book.id))?.disable();
            return book;
          } else {
            if (!book.reserved)
              this.bookForm.get(String(book.id))?.enable()
            return book;
          }
        });
        this.selectedBook = null;
      },
      error: error => {
        console.log(error);
        this.error = error;
      }
    });
  }
}
