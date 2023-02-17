import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Issuebook } from 'src/app/shared/data-access/issuebook';

@Injectable({
  providedIn: 'root'
})
export class IssuebookService {
  private readonly ROOT_URL = "https://library-management-system-g6oa.onrender.com/api/v1";

  constructor(private http: HttpClient) { }

  public getAllIssuedBooks(): Observable<Issuebook[]> {
    console.log("loading all issued books!");
    return this.http.get<Issuebook[]>(this.ROOT_URL + "/issuebook");
  }

  public issueBook(studentId: number, bookId: number): Observable<Issuebook> {
    console.log("reserving bookId: " + bookId + ", to studentId: " + studentId);
    return this.http.get<Issuebook>(this.ROOT_URL + "/student/" + studentId + "/issuebook/" + bookId);
  }

  public returnBook(studentId: number, bookId: number): Observable<Object> {
    console.log("returning bookId: " + bookId + ", by studentId: " + studentId);
    return this.http.get<Object>(this.ROOT_URL + "/student/" + studentId + "/returnbook/" + bookId);
  }
}
