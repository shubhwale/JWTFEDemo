import { Component, OnInit, ViewChild } from '@angular/core';
import { BookService } from 'src/app/shared/book.service';
import { Book } from '../book';
import { MatTableDataSource } from '@angular/material/table';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { CartService } from 'src/app/shared/cart.service';
import { ToastrService } from 'ngx-toastr';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-book-list2',
  templateUrl: './book-list2.component.html',
  styles: [
  ]
})
export class BookList2Component implements OnInit {

  booksList: MatTableDataSource<Book>;
  displayedColumns: string[]=['bookImage','bookTitle','bookPrice','bookRating','options'];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private bookService: BookService, private ratingConfig: NgbRatingConfig,
    private cartService: CartService, private toastr: ToastrService) { 
    this.booksList=new MatTableDataSource<Book>();
    ratingConfig.readonly=true;
    ratingConfig.max=5;
  }

  ngOnInit(): void {
    this.bookService.getBooks().subscribe((list: Book[])=> {
      this.booksList.data = list;
      this.booksList.paginator = this.paginator;
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
