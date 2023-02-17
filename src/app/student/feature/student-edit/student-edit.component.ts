import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { Student } from 'src/app/shared/data-access/student';
import { StoreService } from 'src/app/shared/store/store.service';
import { StudentService } from '../../data-access/student.service';

@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.css']
})
export class StudentEditComponent implements OnInit {
  @ViewChild("formGroupDirective") public formGroupDirective!: FormGroupDirective;
  @ViewChild("fileInput") public fileInput!: ElementRef;

  public editStudentForm!: FormGroup;
  public savedStudent!: Student;
  public error: HttpErrorResponse | null = null;
  public loaded = false;

  public imageSrc!: string;
  public selectedFile: File | null = null;


  constructor(private activatedRoute: ActivatedRoute, private studentService: StudentService, private fb: FormBuilder, private storeService: StoreService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.editStudentForm = this.fb.group({
      id: [null, Validators.required],
      stream: [null, [Validators.required, Validators.minLength(2)]],
      name: [null, [Validators.required, Validators.minLength(3)]],
      gender: [null, Validators.required],
      dob: [null, Validators.required],
      contact: [null, [Validators.required, Validators.pattern("^[7-9][0-9]{9}$")]],
      email: [null, [Validators.required, Validators.pattern("^[a-z0-9](\.?[a-z0-9]){5,}@g(oogle)?mail\.com$")]]
    });

    //loading book by id
    let studentId: number = Number(this.activatedRoute.snapshot.paramMap.get("id"));
    this.studentService.getStudentById(studentId).subscribe({
      next: data => {
        this.savedStudent = data;
        this.imageSrc = data.imageUrl || "assets/images/default-student-image.png";
        this.fetchValues(data);
        this.loaded = true;
      },
      error: error => {
        console.log(error);
        this.error = error;
      }
    });
  }

  public fetchValues(savedStudent: Student): void {
    this.editStudentForm.setValue({
      id: savedStudent.id,
      stream: savedStudent.stream,
      name: savedStudent.name,
      gender: savedStudent.gender,
      dob: moment(savedStudent.dob, "DD-MM-YYYY").toDate(),
      contact: savedStudent.contact,
      email: savedStudent.email
    });
  }

  public updateStudent(): void {
    if (!(this.editStudentForm.value.dob === null) && !(moment(this.editStudentForm.value.dob, 'DD-MM-YYYY').format('DD-MM-YYYY') === this.editStudentForm.value.dob))
      this.editStudentForm.value.dob = moment(this.editStudentForm.value.dob).format('DD-MM-YYYY');

    if (this.error !== null)
      this.error = null;

    let modifiedStudent = this.editStudentForm.value as Student;
    this.studentService.updateStudent(modifiedStudent).subscribe({
      next: data => {
        this.savedStudent = data;
        this.storeService.modifyStudent(data);
        this._snackBar.open(data.name + " updated successfully!", "", { duration: 3000 });

        //reseting form
        this.formGroupDirective.resetForm();
        this.fetchValues(this.savedStudent);
      },
      error: error => {
        console.log(error);
        this.error = error;
      }
    });
  }

  public reset(): void {
    this.formGroupDirective.resetForm();
    this.fileInput.nativeElement.value = "";
    this.selectedFile = null;
    this.error = null;
    this.imageSrc = this.savedStudent.imageUrl || "assets/images/default-student-image.png";
    this.fetchValues(this.savedStudent);
  }

  public onFileSelect(event: any): void {
    if (event.target.files) {
      this.selectedFile = event.target.files[0];
      let reader = new FileReader();
      reader.onload = (event: any) => {
        this.imageSrc = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  public updateImage() {
    let studentId = this.savedStudent.id;
    let studentImage = this.selectedFile as File;
    this.studentService.saveStudentImage(studentId, studentImage).subscribe({
      next: data => {
        this.savedStudent.imageUrl = data.imageUrl;
        this.storeService.addStudentImage(studentId, data);
        this._snackBar.open("Image updated successfully!", "", { duration: 3000 });

        //reseting image
        this.fileInput.nativeElement.value = "";
        this.selectedFile = null;
      }
    });
  }

  get getStudentId() {
    return this.editStudentForm.get("id");
  }

  get getStudentStream() {
    return this.editStudentForm.get("stream");
  }

  get getStudentName() {
    return this.editStudentForm.get("name");
  }


  get getStudentGender() {
    return this.editStudentForm.get("gender");
  }

  get getStudentDob() {
    return this.editStudentForm.get("dob");
  }

  get getStudentContact() {
    return this.editStudentForm.get("contact");
  }

  get getStudentEmail() {
    return this.editStudentForm.get("email");
  }
}