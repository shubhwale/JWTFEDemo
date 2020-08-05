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

  constructor(public bookService: BookService,config: NgbRatingConfig,private route: ActivatedRoute,private toastr : ToastrService) {
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

  addToCart() {
    var status : string="Duplicate";
    var localStoredCartItems : Cart[]= JSON.parse(localStorage.getItem("cartItems")) ;
    if(localStoredCartItems && localStoredCartItems!=[]) {
      var size: number = localStoredCartItems.length;
      loop: for(var i=0;i<=size;i++) {
        var item: Cart = localStoredCartItems[i];
        if(i==size) {
          localStoredCartItems.push(new Cart(BookDetailsComponent.counter,this.book.bookId,this.book.title,
          this.book.imageUrl,this.book.rating,1,this.book.price));
          BookDetailsComponent.counter+=1;
          localStorage.setItem("cartItems",JSON.stringify(localStoredCartItems));
          status="Success";
        }
        else if(item.bookId==this.book.bookId) {
          break loop;
        }
        else {
          continue loop;
        }
      }
    }
    if(status == "Success") {
      this.toastr.success(this.book.title+" Added",status);
    }
    else {
      this.toastr.info("Already exists in cart","Duplicate");
    }
  }

}
