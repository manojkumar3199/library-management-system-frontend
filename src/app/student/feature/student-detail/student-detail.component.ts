import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { Issuebook } from 'src/app/shared/data-access/issuebook';
import { Student } from 'src/app/shared/data-access/student';
import { StudentService } from '../../data-access/student.service';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.css']
})
export class StudentDetailComponent implements OnInit {
  public savedStudent!: Student;
  public issuedBooks!: Issuebook[];
  public error: HttpErrorResponse | null = null;

  public studentLoaded = false;

  constructor(private studentService: StudentService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    let studentId: number = Number(this.activatedRoute.snapshot.paramMap.get("id"));
    // this.issuedBooks$ = this.studentService.getStudentById(studentId).pipe(
    //   switchMap(student => this.studentService.getIssuedBooksByStudentId(student.id))
    // );
    this.studentService.getStudentById(studentId).subscribe({
      next: data => {
        this.savedStudent = data;
        this.studentService.getIssuedBooksByStudentId(data.id).subscribe({
          next: data => this.issuedBooks = data,
          error: error => {
            console.log(error);
            if (this.error?.error)
              this.error = error;
          }
        });
        this.studentLoaded = true;
      },
      error: error => {
        console.log(error);
        this.error = error;
      }
    });
  }
}
