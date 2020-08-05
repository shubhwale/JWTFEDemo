import { Component, OnInit } from '@angular/core';
import { Book } from '../book';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { BookService } from 'src/app/shared/book.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cart } from 'src/app/cart/cart';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styles: [
  ],

})
export class BookDetailsComponent implements OnInit {

  constructor(public bookService: BookService, config: NgbRatingConfig, private route: ActivatedRoute, private toastr: ToastrService) {
    config.readonly = true;
    config.max = 5;
  }

  book: Book;

  ngOnInit(): void {
    this.route.paramMap.subscribe((map: ParamMap) => {
      let bookId = +map.get("id");
      this.bookService.findBookById(bookId)
        .then((data: Book) => {
          this.book = data;
        }, (err) => {
          console.log(err);
        })
    })
  }

  addToCart(book: Book) {
    this.bookService.addToCartService(book);
  }
}
