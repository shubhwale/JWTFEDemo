import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/shared/book.service';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { Book } from '../book';
import { ToastrService } from 'ngx-toastr';
import { Cart } from 'src/app/cart/cart';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styles: [
  ]
})
export class BooksListComponent implements OnInit {

  constructor(public bookService: BookService,private config: NgbRatingConfig,private toastr : ToastrService) {
    // customize default values of ratings used by this component tree
    config.readonly = true;
    config.max=5;
  }

  booksList: Book[];
  categoryList: {}
  static counter: number=1;

  ngOnInit() {
    this.bookService.getBooks().subscribe((data : Book[]) => {
      this.booksList = data;
    });
    this.bookService.getCategories().subscribe(categories => {
      this.categoryList = categories;
    });
  }

  addToCart(book : Book) {
    var status : string="Duplicate";
    var localStoredCartItems : Cart[]= JSON.parse(localStorage.getItem("cartItems")) ;
    if(localStoredCartItems) {
      var size: number = localStoredCartItems.length;
      loop: for(var i=0;i<=size;i++) {
        var item: Cart = localStoredCartItems[i];
        if(i==size) {
          localStoredCartItems.push(new Cart(BooksListComponent.counter,book.bookId,book.title,
          book.imageUrl,book.rating,1,book.price));
          BooksListComponent.counter+=1;
          localStorage.setItem("cartItems",JSON.stringify(localStoredCartItems));
          status="Success";
        }
        else if(item.bookId==book.bookId) {
          break loop;
        }
        else {
          continue loop;
        }
      }
    }
    if(status == "Success") {
      this.toastr.success(book.title+" Added",status);
    }
    else {
      this.toastr.info("Already exists in cart","Duplicate");
    }
  }
}
