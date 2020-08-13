import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/shared/book.service';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { Book } from '../book';
import { ToastrService } from 'ngx-toastr';
import { HeaderComponent } from 'src/app/header/header.component';
import { CartService } from 'src/app/shared/cart.service';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styles: [
  ]
})
export class BooksListComponent implements OnInit {

  constructor(public bookService: BookService, private config: NgbRatingConfig, private toastr: ToastrService
    ,private header: HeaderComponent, private cartService: CartService) {
    // customize default values of ratings used by this component tree
    config.readonly = true;
    config.max = 5;
  }

  booksList: Book[];
  categoryList: {}

  ngOnInit() {
    this.bookService.getBooks().subscribe((data: Book[]) => {
      this.booksList = data;
    });
    this.bookService.getCategories().subscribe(categories => {
      this.categoryList = categories;
    });
  }

  addToCart(book: Book) {
    const status: boolean = this.cartService.addToCartService(book);
    if(status) {
      this.toastr.success(book.title + " Added", "Success");
    }
    else {
      this.toastr.error("Already added","Duplicate");
    }
  }
}
