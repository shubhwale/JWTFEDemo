import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/shared/book.service';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { Book } from '../book';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styles: [
  ]
})
export class BookDetailsComponent implements OnInit {

  constructor(public bookService: BookService,config: NgbRatingConfig) {
    // customize default values of ratings used by this component tree
    config.readonly = true;
    config.max=5;
  }

  book : Book

  ngOnInit(): void {
    console.log("hi");
  }

}
