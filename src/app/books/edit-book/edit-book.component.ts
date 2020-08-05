import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/shared/book.service';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Book } from '../book';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styles: [
  ]
})
export class EditBookComponent implements OnInit {

  constructor(private fb: FormBuilder, private toastr: ToastrService, private router: Router, public bookService: BookService,
    config: NgbRatingConfig, private route: ActivatedRoute) {
    config.readonly = true;
    config.max = 5;
  }

  editForm: FormGroup = this.fb.group({
    Title: ['', [Validators.minLength(3), Validators.required]],
    Author: ['', [Validators.required, Validators.minLength(3)]],
    Publisher: ['', [Validators.required, Validators.minLength(3)]],
    NoOfPages: ['', [Validators.required, Validators.min(1)]],
    Edition: ['', [Validators.required, Validators.min(1)]],
    Price: ['', [Validators.required, Validators.min(0)]],
    ReleaseDate: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(10)]]
  });;

  book: Book;

  ngOnInit(): void {
    this.route.paramMap.subscribe(async (map: ParamMap) => {
      let bookId = +map.get("id");
      await this.bookService.findBookById(bookId).
        then((data: Book) => {
          this.book = data;
          this.editForm.controls['Title'].setValue(data.title);
          this.editForm.controls['Author'].setValue(data.author);
          this.editForm.controls['Publisher'].setValue(data.publisher);
          this.editForm.controls['NoOfPages'].setValue(data.noOfPages);
          this.editForm.controls['Edition'].setValue(data.edition);
          this.editForm.controls['Price'].setValue(data.price);
          const yr = new Date(data.releaseDate).getFullYear();
          let month = (new Date(data.releaseDate).getMonth() + 1).toString();
          if (month.length == 1) {
            month = "0" + month;
          }
          let day = (new Date(data.releaseDate).getDate()).toString();
          if (day.length == 1) {
            day = "0" + day;
          }
          const date = yr + "-" + month + "-" + day;
          this.editForm.controls['ReleaseDate'].setValue(date);
        }, err => {
          console.log(err);
        })
    });
  }

  onSubmit() {
    var body: object = {
      bookId: this.book?.bookId,
      title: this.editForm.value?.Title,
      author: this.editForm.value?.Author,
      publisher: this.editForm.value?.Publisher,
      noOfPages: parseInt(this.editForm.value?.NoOfPages),
      rating: this.book?.rating,
      edition: parseInt(this.editForm.value?.Edition),
      price: parseInt(this.editForm.value?.Price),
      releaseDate: this.editForm.value?.ReleaseDate,
      imageUrl: this.book?.imageUrl
    };

    this.bookService.editBook(body).then((res: Response) => {
      if (res) {
        if (res.status === 200) {
          this.router.navigateByUrl('/book/' + body['bookId'].toString());
          this.toastr.success('Success', 'Book Edited');
        }
        else {
          this.toastr.error('Fail', 'Cannot Edit Book');
        }
      }
    },
      err => {
        console.log(err);
      });
  }
}
