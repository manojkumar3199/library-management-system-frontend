import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { Book } from '../data-access/book';
import { Category } from '../data-access/category';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private categories$ = new BehaviorSubject<Category[]>([]);
  private books$ = new BehaviorSubject<Book[]>([]);

  public loaded = false;
  public booksLoaded = false;

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
  public setBooks(books: Book[]): void {
    this.books$.next(books);
    this.booksLoaded = true;
  }

  public loadBooks(): Observable<Book[]> {
    return this.books$;
  }

  public removeBook(bookId: number): void {
    this.books$.next(this.books$.getValue().filter(book => book.id !== bookId));
  }

  public addBook(newBook: Book): void {
    this.books$.next([...this.books$.value, newBook]);
  }

  constructor() { }
}
