import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/shared/book.service';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { Book } from '../book';
import { ToastrService } from 'ngx-toastr';
import { Cart } from 'src/app/cart/cart';
import { HeaderComponent } from 'src/app/header/header.component';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styles: [
  ]
})
export class BooksListComponent implements OnInit {

  constructor(public bookService: BookService, private config: NgbRatingConfig, private toastr: ToastrService
    ,private header: HeaderComponent) {
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
    this.bookService.addToCartService(book);
  }
}
