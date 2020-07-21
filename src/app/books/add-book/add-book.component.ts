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
      BookID : ['',Validators.required],
      Title : ['',[Validators.required,Validators.minLength(3)]],
      Author : ['',[Validators.required,Validators.minLength(3)]],
      Publisher : ['',[Validators.required,Validators.minLength(3)]],
      NoOfPages : ['',Validators.required],
      Edition : ['',Validators.required],
      Price : ['',Validators.required],
      ReleaseDate : ['',Validators.required]
    });
  }

  onSubmit() {
    var body = {
      BookId : this.formModel2.value.BookID,
      Title : this.formModel2.value.Title,
      Author : this.formModel2.value.Author,
      Publisher : this.formModel2.value.Publisher,
      NoOfPages : this.formModel2.value.NoOfPages,
      Rating : 0,
      Edition : this.formModel2.value.Edition,
      Price : this.formModel2.value.Price,
      ReleaseDate : this.formModel2.value.ReleaseDate,
      ImageUrl : this.generateImageURL(this.formModel2.value.Title)
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
    var str = title.split(' ').join('_').toLowerCase().concat(".jpeg");
    return str;
  }

}
