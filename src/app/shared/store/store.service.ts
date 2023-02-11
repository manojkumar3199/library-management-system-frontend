import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { Book } from '../data-access/book';
import { Category } from '../data-access/category';
import { Image } from '../data-access/image';

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

  constructor() { }
}
