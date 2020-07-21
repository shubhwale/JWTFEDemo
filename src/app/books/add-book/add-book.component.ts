import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/shared/book.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styles: [
  ]
})
export class AddBookComponent implements OnInit {
  
  constructor(public service : BookService,private toastr : ToastrService, private router : Router, private fb : FormBuilder) { }

  formModel2;
  
  ngOnInit(): void {
    this.formModel2 = this.fb.group({
      BookID : ['',[Validators.required,Validators.min(1)]],
      Title : ['',[Validators.required,Validators.minLength(3)]],
      Author : ['',[Validators.required,Validators.minLength(3)]],
      Publisher : ['',[Validators.required,Validators.minLength(3)]],
      NoOfPages : ['',[Validators.required,Validators.min(1)]],
      Edition : ['',[Validators.required,Validators.min(1)]],
      Price : ['',[Validators.required,Validators.min(0)]],
      ReleaseDate : ['',[Validators.required,Validators.minLength(8),Validators.maxLength(10)]]
    });
  }

  onSubmit() {
    var body = {
      bookId : parseInt(this.formModel2.value.BookID),
      title : this.formModel2.value.Title,
      author : this.formModel2.value.Author,
      publisher : this.formModel2.value.Publisher,
      noOfPages : parseInt(this.formModel2.value.NoOfPages),
      rating : 0,
      edition : parseInt(this.formModel2.value.Edition),
      price : parseInt(this.formModel2.value.Price),
      releaseDate : this.generateDateString(this.formModel2.value.ReleaseDate),
      imageUrl : this.generateImageURL(this.formModel2.value.Title)
    };

    this.service.addBook(body).then((res:any) => {
      if(res.hasOwnProperty('bookId')) {
        this.formModel2.reset();
        this.toastr.success('Success','New Book Added');          
      }
      else {
        this.toastr.error('Fail','Cannot Add Book');
      }
    },
    err => {
      console.log(err);
    });
  }

  generateImageURL(title : any) {
    var str = "assets/images/"+
              title.split(' ').join('_').toLowerCase().concat(".jpeg");
    return str;
  }

  generateDateString(jsonDate : object) {
    var str = "";
    str=jsonDate['year']+"-";
    var month : string = jsonDate['month']+"";
    if(month.length==1) {
      month="0"+month;
    }
    var day : string = jsonDate['day']+"";
    if(day.length==1) {
      day="0"+day;
    }
    str+=month+"-"+day;
    return str;
  }

}
