import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/shared/data-access/book';
import { BookService } from '../../data-access/book.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  public imgSrc!: string;
  public savedBook!: Book;
  public error: HttpErrorResponse | null = null;

  public loaded = false;

  constructor(private bookService: BookService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    let bookId: number = Number(this.activatedRoute.snapshot.paramMap.get("id"));
    this.bookService.getBookById(bookId).subscribe({
      next: data => {
        this.savedBook = data;
        this.imgSrc = data.imageUrl || "assets/images/default-book-image.jpg";
        this.loaded = true;
      },
      error: error => {
        console.log(error);
        this.error = error;
      }
    });
  }
}
