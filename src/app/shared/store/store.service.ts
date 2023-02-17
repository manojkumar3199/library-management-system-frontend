import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Book } from '../data-access/book';
import { Category } from '../data-access/category';
import { Image } from '../data-access/image';
import { Issuebook } from '../data-access/issuebook';
import { Student } from '../data-access/student';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private categories$ = new BehaviorSubject<Category[]>([]);

  public loaded = false;

  public loadCategories(): Observable<Category[]> {
    return this.categories$;
  }

  public setCategories(categories: Category[]): void {
    this.categories$.next(categories);
    this.loaded = true;
  }

  public removeCategory(savedCategoryId: number): void {
    this.categories$.next(this.categories$.getValue().filter(category => category.id !== savedCategoryId));
  }

  public addCategory(newCategory: Category): void {
    this.categories$.next([...this.categories$.value, newCategory]);
  }

  public modifyCategory(modifiedCategory: Category): void {
    this.categories$.next(this.categories$.getValue().map(category => category.id === modifiedCategory.id ? modifiedCategory : category));
  }

  //book
  private books$ = new BehaviorSubject<Book[]>([]);
  public currentBooks$ = this.books$.asObservable();
  public booksLoaded = false;

  public loadBooks(books: Book[]): void {
    this.books$.next(books);
    this.booksLoaded = true;
  }

  public removeBook(bookId: number): void {
    this.books$.next(this.books$.getValue().filter(book => book.id !== bookId));
  }

  public addBook(newBook: Book): void {
    this.books$.next([...this.books$.value, newBook]);
  }

  public addBookImage(bookId: number, image: Image): void {
    this.books$.next(this.books$.value.map(book => {
      if (book.id === bookId) {
        book.imageUrl = image.imageUrl;
        return book;
      }
      return book;
    }));
  }

  public modifyBook(modifiedBook: Book): void {
    this.books$.next(this.books$.getValue().map(book => book.id === modifiedBook.id ? modifiedBook : book));
  }

  //student
  private students$ = new BehaviorSubject<Student[]>([]);
  public currentStudents$ = this.students$.asObservable();
  public studentsLoaded = false;

  public loadStudents(students: Student[]): void {
    this.students$.next(students);
    this.studentsLoaded = true;
  }

  public addStudent(newStudent: Student): void {
    this.students$.next([...this.students$.value, newStudent]);
  }

  public addStudentImage(studentId: number, studentImage: Image): void {
    this.students$.next(this.students$.value.map(student => {
      if (student.id === studentId) {
        student.imageUrl = studentImage.imageUrl;
        return student;
      }
      return student;
    }));
  }

  public removeStudent(studentId: number): void {
    this.students$.next(this.students$.getValue().filter(student => student.id !== studentId));
  }

  public modifyStudent(modifiedStudent: Student): void {
    this.students$.next(this.students$.getValue().map(student => student.id === modifiedStudent.id ? modifiedStudent : student));
  }

  //issuebook
  private issuedBooks$ = new BehaviorSubject<Issuebook[]>([]);
  public currentIssuedBooks$ = this.issuedBooks$.asObservable();
  public issuedBooksLoaded = false;

  public loadIssuedBooks(issuedBooks: Issuebook[]): void {
    this.issuedBooks$.next(issuedBooks);
    this.issuedBooksLoaded = true;
  }

  public addIssuedBook(newIssuedBook: Issuebook): void {
    this.issuedBooks$.next([...this.issuedBooks$.value, newIssuedBook]);
  }

  public removeIssuedBook(issuedBookId: number): void {
    this.issuedBooks$.next(this.issuedBooks$.getValue().filter(issuedBook => issuedBook.id !== issuedBookId));
  }

  constructor() { }
}