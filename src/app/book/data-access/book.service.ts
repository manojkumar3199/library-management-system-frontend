import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from 'src/app/shared/data-access/book';
import { Image } from 'src/app/shared/data-access/image';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private readonly ROOT_URL = "https://library-management-system-g6oa.onrender.com/api/v1";

  constructor(private http: HttpClient) { }

  public saveNewBook(newBook: Book): Observable<Book> {
    console.log(newBook);
    return this.http.post<Book>(this.ROOT_URL + "/book/category/" + newBook.category.id, newBook);
  }

  public getAllBooks(): Observable<Book[]> {
    console.log("loading books!");
    return this.http.get<Book[]>(this.ROOT_URL + "/book");
  }

  public deleteBook(bookId: number): Observable<Object> {
    console.log(bookId);
    return this.http.delete(this.ROOT_URL + "/book/" + bookId);
  }

  public saveBookImage(bookId: number, bookImage: File): Observable<Image> {
    let formData = new FormData();
    formData.append("bookImage", bookImage, bookImage.name);
    console.log(formData);
    return this.http.post<Image>(this.ROOT_URL + "/book/" + bookId + "/uploadimage", formData);
  }

  public getBookById(bookId: number): Observable<Book> {
    console.log("loading book: " + bookId);
    return this.http.get<Book>(this.ROOT_URL + "/book/" + bookId);
  }

  public updateBook(modifiedBook: Book): Observable<Book> {
    console.log(modifiedBook);
    return this.http.put<Book>(this.ROOT_URL + "/book/" + modifiedBook.id + "/category/" + modifiedBook.category.id, modifiedBook);
  }

  public getBooksByCategory(categoryId: number): Observable<Book[]> {
    console.log("loading books of category: " + categoryId);
    return this.http.get<Book[]>(this.ROOT_URL + "/book/category/" + categoryId);
  }
}
