import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatStepper } from '@angular/material/stepper';
import * as moment from 'moment';
import { Student } from 'src/app/shared/data-access/student';
import { StoreService } from 'src/app/shared/store/store.service';
import { StudentService } from '../../data-access/student.service';

@Component({
  selector: 'app-student-add',
  templateUrl: './student-add.component.html',
  styleUrls: ['./student-add.component.css']
})
export class StudentAddComponent implements OnInit {
  public selectedFile: File | null = null;
  public error: HttpErrorResponse | null = null;

  public firstStep = true;
  public secondStep = true;

  public addNewStudentForm!: FormGroup;
  @ViewChild("formGroupDirective") private formGroupDirective!: FormGroupDirective;

  public currentSavedStudent: Student | null = null;

  constructor(private studentService: StudentService, private storeService: StoreService, private fb: FormBuilder, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.addNewStudentForm = this.fb.group({
      stream: [null, [Validators.required, Validators.minLength(2)]],
      name: [null, [Validators.required, Validators.minLength(3)]],
      gender: [null, Validators.required],
      dob: [null, Validators.required],
      contact: [null, [Validators.required, Validators.pattern("^[7-9][0-9]{9}$")]],
      email: [null, [Validators.required, Validators.pattern("^[a-z0-9](\.?[a-z0-9]){5,}@g(oogle)?mail\.com$")]]
    });
  }

  get getStudentStream() {
    return this.addNewStudentForm.get("stream");
  }

  get getStudentName() {
    return this.addNewStudentForm.get("name");
  }


  get getStudentGender() {
    return this.addNewStudentForm.get("gender");
  }

  get getStudentDob() {
    return this.addNewStudentForm.get("dob");
  }

  get getStudentContact() {
    return this.addNewStudentForm.get("contact");
  }

  get getStudentEmail() {
    return this.addNewStudentForm.get("email");
  }

  public saveNewStudent(stepper: MatStepper): void {
    if (!(this.addNewStudentForm.value.dob === null) && !(moment(this.addNewStudentForm.value.dob, 'DD-MM-YYYY').format('DD-MM-YYYY') === this.addNewStudentForm.value.dob))
      this.addNewStudentForm.value.dob = moment(this.addNewStudentForm.value.dob).format('DD-MM-YYYY');

    if (this.error !== null)
      this.error = null;

    let newStudent = this.addNewStudentForm.value as Student;

    this.studentService.saveNewStudent(newStudent).subscribe({
      next: data => {
        this._snackBar.open(data.name + " added successfully!", "", { duration: 3000 });
        this.storeService.addStudent(data);
        this.currentSavedStudent = data;
        this.firstStep = false;
        stepper.next();
      },
      error: error => {
        console.log(error);
        this.error = error;
      }
    });
  }

  public reset(stepper: MatStepper): void {
    stepper.reset();
    this.formGroupDirective.resetForm();
    this.error = null;
  }

  public onFileSelect(event: any): void {
    this.selectedFile = event.target.files[0] ?? null;
  }

  public saveStudentImage(stepper: MatStepper): void {
    if (this.error !== null)
      this.error = null;

    let studentId = this.currentSavedStudent?.id as number;
    let studentImage = this.selectedFile as File;
    this.studentService.saveStudentImage(studentId, studentImage).subscribe({
      next: data => {
        this._snackBar.open("Image Uploaded Successfully!", "", { duration: 3000 });
        this.storeService.addStudentImage(studentId, data);
        this.secondStep = false;
        stepper.next();
      },
      error: error => {
        console.log(error);
        this.error = error;
      }
    });
  }

  public skipImageUploading(stepper: MatStepper) {
    if (this.error !== null)
      this.error = null;

    this.secondStep = false;
    stepper.next();
  }
}
