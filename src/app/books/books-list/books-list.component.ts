import { Component, OnInit, ViewChild } from '@angular/core';
import { BookService } from 'src/app/shared/book.service';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { Book } from '../book';
import { ToastrService } from 'ngx-toastr';
import { HeaderComponent } from 'src/app/header/header.component';
import { CartService } from 'src/app/shared/cart.service';
import { MatTableDataSource } from '@angular/material/table'
import { MatPaginator } from '@angular/material/paginator';
import { Category } from './category';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styles: [
  ]
})
export class BooksListComponent implements OnInit {

  booksList: MatTableDataSource<Book>;
  categoryList: Category[];
  displayedColumns: string[] = ['bookImage', 'bookTitle', 'bookPrice', 'bookRating', 'options'];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public bookService: BookService, private config: NgbRatingConfig, private toastr: ToastrService
    , private header: HeaderComponent, private cartService: CartService) {
    // customize default values of ratings used by this component tree
    config.readonly = true;
    config.max = 5;
    this.booksList = new MatTableDataSource<Book>();
  }

  ngOnInit() {
    this.bookService.getBooks().subscribe((list: Book[]) => {
      this.booksList.data = list;
      this.booksList.paginator = this.paginator;
    });
    this.bookService.getCategories().subscribe((categories: Category[]) => {
      this.categoryList = categories;
    });
  }

  addToCart(book: Book) {
    const status: boolean = this.cartService.addToCartService(book);
    if (status) {
      this.toastr.success(book.title + " Added", "Success");
    }
    else {
      this.toastr.error("Already added", "Duplicate");
    }
  }

  categoryListing(categoryId: number): void {
    this.bookService.getBooks(categoryId).subscribe((list: Book[]) => {
      this.booksList.data = list;
      this.booksList.paginator = this.paginator;
    });
  }
}
