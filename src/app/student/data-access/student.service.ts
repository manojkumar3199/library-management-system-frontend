import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Image } from 'src/app/shared/data-access/image';
import { Issuebook } from 'src/app/shared/data-access/issuebook';
import { Student } from 'src/app/shared/data-access/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private readonly ROOT_URL = "https://library-management-system-g6oa.onrender.com/api/v1";

  constructor(private http: HttpClient) { }

  public saveNewStudent(newStudent: Student): Observable<Student> {
    console.log(newStudent);
    return this.http.post<Student>(this.ROOT_URL + "/student", newStudent);
  }

  public saveStudentImage(studentId: number, studentImage: File): Observable<Image> {
    console.log(studentImage);
    let formData = new FormData();
    formData.append("studentImage", studentImage, studentImage.name);
    return this.http.post<Image>(this.ROOT_URL + "/student/" + studentId + "/uploadimage", formData);
  }

  public getAllStudents(): Observable<Student[]> {
    console.log("loading students!");
    return this.http.get<Student[]>(this.ROOT_URL + "/student");
  }

  public deleteStudent(studentId: number): Observable<Object> {
    console.log(studentId);
    return this.http.delete(this.ROOT_URL + "/student/" + studentId);
  }

  public getStudentById(studentId: number): Observable<Student> {
    console.log("loading student: " + studentId);
    return this.http.get<Student>(this.ROOT_URL + "/student/" + studentId);
  }

  public getIssuedBooksByStudentId(studentId: number): Observable<Issuebook[]> {
    console.log("loading all issued books of student: " + studentId);
    return this.http.get<Issuebook[]>(this.ROOT_URL + "/student/" + studentId + "/issuebook");
  }

  public updateStudent(modifiedStudent: Student): Observable<Student> {
    console.log(modifiedStudent);
    return this.http.put<Student>(this.ROOT_URL + "/student/" + modifiedStudent.id, modifiedStudent);
  }
}
