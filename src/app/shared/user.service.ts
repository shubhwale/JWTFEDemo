import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { UserComponent } from 'src/app/user/user.component'
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private user : UserComponent) { }
  private readonly BaseUri = 'https://localhost:44335/api';

  register(body) {
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
