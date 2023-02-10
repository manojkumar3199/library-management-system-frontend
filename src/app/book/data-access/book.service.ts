import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from 'src/app/shared/data-access/book';

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
    return this.http.delete(this.ROOT_URL + "/book/" + bookId);
  }

  public saveBookImage(bookId: number, bookImage: File): Observable<string> {
    let formData = new FormData();
    formData.append("bookImage", bookImage, bookImage.name);
    return this.http.post<string>(this.ROOT_URL + "/book/" + bookId + "/uploadimage", formData);
  }
}
