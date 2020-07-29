import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/shared/book.service';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { Book } from '../book';
import { CartService } from 'src/app/shared/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styles: [
  ]
})
export class BooksListComponent implements OnInit {

  constructor(public bookService: BookService,private config: NgbRatingConfig,private cart: CartService,
    private toastr : ToastrService) {
    // customize default values of ratings used by this component tree
    config.readonly = true;
    config.max=5;
  }

  booksList: Book[];
  categoryList: {}

  ngOnInit() {
    this.bookService.getBooks().subscribe((data : Book[]) => {
      this.booksList = data;
    });
    this.bookService.getCategories().subscribe(categories => {
      this.categoryList = categories;
    });
  }

  async addToCart(book : Book) {
    await this.cart.sendProduct(book);
    this.toastr.success(book.title+" Added","Success");
  }
}
