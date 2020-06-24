import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private fb: FormBuilder, private http: HttpClient) { }
  private readonly BaseUri = 'https://localhost:44377/api';
  formModel = this.fb.group({
    UserName : ['',Validators.required],
    Email : ['',Validators.email],
    FullName : [''],
    Passwords : this.fb.group({
      Password : ['',[Validators.required,Validators.minLength(3)]],
      ConfirmPassword : ['',Validators.required]
    },{validator : this.comparePasswords})
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
      UserName : this.formModel.value.UserName,
      Email : this.formModel.value.Email,
      FullName : this.formModel.value.FullName,
      Password : this.formModel.value.Passwords.Password,
      //ConfirmPassword : this.formModel.value.Passwords.ConfirmPassword
    };
    return this.http.post(this.BaseUri+'/applicationuser/register',body);
  }

  login(formData) {
     return this.http.post(this.BaseUri+'/applicationuser/login',formData);
  }

  getUserProfile() {
    //var tokenHeader = new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('token')});
    //return this.http.get(this.BaseUri+'/userprofile',{headers : tokenHeader});
    return this.http.get(this.BaseUri+'/userprofile');
  }
}
