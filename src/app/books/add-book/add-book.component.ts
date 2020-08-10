import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/shared/book.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; // Notice it is imported from @angular/common/http instead of @angular/http

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styles: [
  ]
})
export class AddBookComponent implements OnInit {

  constructor(public service: BookService, private toastr: ToastrService, private router: Router, private fb: FormBuilder) { }

  addBookForm;

  ngOnInit(): void {
    this.addBookForm = this.fb.group({
      Title: ['', [Validators.required, Validators.minLength(3)]],
      Author: ['', [Validators.required, Validators.minLength(3)]],
      Publisher: ['', [Validators.required, Validators.minLength(3)]],
      NoOfPages: ['', [Validators.required, Validators.min(1)]],
      Edition: ['', [Validators.required, Validators.min(1)]],
      Price: ['', [Validators.required, Validators.min(0)]],
      ReleaseDate: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(10)]]
    });
  }

  onSubmit() {
    var body = {
      title: this.addBookForm.value.Title,
      author: this.addBookForm.value.Author,
      publisher: this.addBookForm.value.Publisher,
      noOfPages: parseInt(this.addBookForm.value.NoOfPages),
      rating: 0,
      edition: parseInt(this.addBookForm.value.Edition),
      price: parseInt(this.addBookForm.value.Price),
      releaseDate: this.generateDateString(this.addBookForm.value.ReleaseDate),
      imageUrl: this.generateImageURL(this.addBookForm.value.Title)
    };

    this.service.addBook(body).then((res: Response) => {
      if (res) {
        if (res.status === 200) {
          this.addBookForm.reset();
          this.toastr.success('Success', 'New Book Added');
          this.router.navigateByUrl('/book/' + res.body["bookId"]);
        }
        else {
          console.log(res.status);
          console.log(res.statusText);
          this.toastr.error('Fail', 'Cannot Add Book');
        }
      }
    },
      err => {
        console.log(err);
      });
  }

  generateImageURL(title: string): string {
    var str = "assets/images/" +
      title.split(' ').join('_').toLowerCase().concat(".jpeg");
    return str;
  }

  generateDateString(jsonDate: object): string {
    var str = "";
    str = jsonDate['year'] + "-";
    var month: string = jsonDate['month'] + "";
    if (month.length == 1) {
      month = "0" + month;
    }
    var day: string = jsonDate['day'] + "";
    if (day.length == 1) {
      day = "0" + day;
    }
    str += month + "-" + day;
    return str;
  }

}
