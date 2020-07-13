import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html'
  //styleUrls: ['./user.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class UserComponent implements OnInit {

  constructor(private fb: FormBuilder) { }

  formModel = this.fb.group({
    Name : ['',Validators.required],
    Email : ['',[Validators.email,Validators.required]],
    Passwords : this.fb.group({
      Password : ['',[Validators.required,Validators.minLength(3)]],
      ConfirmPassword : ['',Validators.required]
    },{validator : this.comparePasswords}),
    Contact : ['',[Validators.required,Validators.pattern("[0-9]{10}")]],
    Gender : ['',Validators.required],
    AddressLine : ['',Validators.required],
    City : ['',Validators.required],
    State : ['',Validators.required]
  });

  comparePasswords(fb:FormGroup) {
    let confirmPswrdCtrl = fb.get('ConfirmPassword');
    //passwordMismatch
    //confirmPswrdCtrl.errors={passwordMismatch=true}
    if(confirmPswrdCtrl.errors == null || 'passwordMismatch' in confirmPswrdCtrl.errors) {
      if(fb.get('Password').value!=confirmPswrdCtrl.value) {
        confirmPswrdCtrl.setErrors({ passwordMismatch:true});
      }
      else {
        confirmPswrdCtrl.setErrors(null);
      }
    }
  }

  ngOnInit(): void {
  }

}
