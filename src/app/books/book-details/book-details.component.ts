import { Component, OnInit } from '@angular/core';
import { Book } from '../book';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { BookService } from 'src/app/shared/book.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styles: [
  ]
})
export class BookDetailsComponent implements OnInit {

  constructor(public bookService: BookService,config: NgbRatingConfig,private route: ActivatedRoute) {
    config.readonly = true;
    config.max=5;
  }

  book: Book
  
  ngOnInit(): void {
    this.route.paramMap.subscribe((map: ParamMap) => {
      let bookId = +map.get("id");
      this.bookService.findBookById(bookId)
      .then((data: Book) => {
          this.book = data;
          console.log(this.book);
      }, (err) => {
          console.log(err);
      })
  })
  }

}
