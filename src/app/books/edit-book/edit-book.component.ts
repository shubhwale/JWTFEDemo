import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/shared/book.service';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Book } from '../book';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styles: [
  ]
})
export class EditBookComponent implements OnInit {

  constructor(private fb: FormBuilder,private toastr : ToastrService,private router : Router,public bookService: BookService,config: NgbRatingConfig,private route: ActivatedRoute) {
    config.readonly=true;
    config.max=5;
  }

  formModel3;

  book : Book;

  ngOnInit(): void {
    this.route.paramMap.subscribe((map: ParamMap) => {
      let bookId = +map.get("id");
      this.bookService.findBookById(bookId).
      then((data : Book) => {
        this.book = data;
      }, err => {
        console.log(err);
      })
    });
    this.formModel3 = this.fb.group({
      BookID : '',
      Title : ['',[Validators.minLength(3),Validators.requiredTrue]],
      Author : ['',Validators.minLength(3)],
      Publisher : ['',Validators.minLength(3)],
      NoOfPages : ['',Validators.min(1)],
      Edition : ['',Validators.min(1)],
      Price : ['',Validators.min(0)],
      ReleaseDate : ['',[Validators.minLength(8),Validators.maxLength(10)]]
    });
  }

  onSubmit() {
    var body = {
      bookId : this.book?.bookId,
      title : this.formModel3.value.Title,
      author : this.formModel3.value.Author,
      publisher : this.formModel3.value.Publisher,
      noOfPages : parseInt(this.formModel3.value.NoOfPages),
      rating : this.book?.rating,
      edition : parseInt(this.formModel3.value.Edition),
      price : parseInt(this.formModel3.value.Price),
      releaseDate : this.bookService.generateDateString(this.formModel3.value.ReleaseDate),
      imageUrl : this.book?.imageUrl
    };

    this.bookService.editBook(body).then((res : Response) => {
      if(res) {
        if(res.status===200) {
          this.router.navigateByUrl('/book/'+body.bookId.toString());
          this.toastr.success('Success','Book Edited');
        }
        else {
          this.toastr.error('Fail','Cannot Edit Book');
        }
      }
    },
    err => {
      console.log(err);
    });
  }
}
