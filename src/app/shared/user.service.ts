import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private fb: FormBuilder, private http: HttpClient) { }
  private readonly BaseUri = 'https://localhost:44335/api';
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

  register() {
    var body = {
      Name : this.formModel.value.Name,
      Email : this.formModel.value.Email,
      Password : this.formModel.value.Passwords.Password,
      Contact : this.formModel.value.Contact,
      Gender : this.formModel.value.Gender,
      AddressLine : this.formModel.value.AddressLine,
      City : this.formModel.value.City,
      State : this.formModel.value.State,
      //ConfirmPassword : this.formModel.value.Passwords.ConfirmPassword
    };
    return this.http.post(this.BaseUri+'/users/register',body);
  }

  login(formData) {
     return this.http.post(this.BaseUri+'/users/login',formData);
  }

  getUserProfile() {
    //var tokenHeader = new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('accessToken')});
    //return this.http.get(this.BaseUri+'/userprofile',{headers : tokenHeader});
    return this.http.get(this.BaseUri+'/users/getuserprofile');
  }
}
