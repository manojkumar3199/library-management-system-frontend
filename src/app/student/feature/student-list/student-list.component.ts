import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Student } from 'src/app/shared/data-access/student';
import { StoreService } from 'src/app/shared/store/store.service';
import { DeleteDialogComponent } from 'src/app/shared/ui/delete-dialog/delete-dialog.component';
import { StudentService } from '../../data-access/student.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  public error: HttpErrorResponse | null = null;
  public students$!: Observable<Student[]>;
  public searchKey!: string;

  public imgSrc!: string;

  constructor(private studentService: StudentService, private storeService: StoreService, private _snackBar: MatSnackBar, private _dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    if (!this.storeService.studentsLoaded) {
      this.studentService.getAllStudents().subscribe({
        next: data => {
          this.storeService.loadStudents(data);
        },
        error: error => {
          console.log(error);
          this.error = error;
        }
      });
    }
    this.students$ = this.storeService.currentStudents$;
  }

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.searchKey = filterValue;
  }

  public deleteStudent(savedStudent: Student): void {
    this._dialog.open(DeleteDialogComponent, { data: { type: "student", name: savedStudent.name } }).afterClosed().subscribe(result => {
      if (result === "cancel" || result === undefined) {
        console.log("canceling delete operation!");
      } else {
        this.studentService.deleteStudent(savedStudent.id).subscribe({
          next: data => {
            this.storeService.removeStudent(savedStudent.id);
            this.storeService.decrementStudent();
            this._snackBar.open(savedStudent.name + " deleted successfully!", "", { duration: 3000 });
          },
          error: error => {
            console.log(error);
            this.error = error;
          }
        });
      }
    });
  }

  public editStudent(savedStudent: Student): void {
    this.router.navigate(["student/edit", savedStudent.id]);
  }

  public viewStudent(savedStudent: Student): void {
    this.router.navigate(["student/detail", savedStudent.id]);
  }
}
