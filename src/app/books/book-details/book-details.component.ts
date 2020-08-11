import { Component, OnInit } from '@angular/core';
import { Book } from '../book';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { BookService } from 'src/app/shared/book.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/shared/cart.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styles: [
  ],
  
})
export class BookDetailsComponent implements OnInit {

  constructor(public bookService: BookService,config: NgbRatingConfig,private route: ActivatedRoute,private toastr : ToastrService,
    private cartService: CartService) {
    config.readonly = true;
    config.max=5;
  }

  book: Book;
  static counter: number = 1;

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
    const status: boolean = this.cartService.addToCartService(book);
    if(status) {
      this.toastr.success("Book Added", "Success");
    }
    else {
      this.toastr.error("Already added","Duplicate");
    }
  }

}
