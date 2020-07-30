import { Component, OnInit } from '@angular/core';
import { Book } from '../book';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { BookService } from 'src/app/shared/book.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CartService } from 'src/app/shared/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styles: [
  ]
})
export class BookDetailsComponent implements OnInit {

  constructor(public bookService: BookService,config: NgbRatingConfig,private route: ActivatedRoute,
    private cart: CartService,private toastr : ToastrService) {
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
      }, (err) => {
          console.log(err);
      })
  })
  }

  addToCart() {
    var status : string = this.cart.sendProduct(this.book);
    if(status == "Success") {
      this.toastr.success(this.book.title+" Added","Success");
    }
    else {
      this.toastr.info("Already exists in cart","Duplicate");
    }
  }

}
