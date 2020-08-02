import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';
import { UserDetails } from './UserDetails';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit {
  userDetails : UserDetails = new UserDetails();
  constructor(private router : Router,private service : UserService) { 
  }
  public flag: boolean=false;

  ngOnInit(): void {
    const userId : number = +localStorage.getItem("userId");
    if(userId) {
      this.service.getUserDetails(userId).then((value: Object) => {
        this.userDetails.userID=value['userId'];
        this.userDetails.userFullName=value['name'];
        this.userDetails.userEmail=value['email'];
      });
      this.flag=true;
    }
  }

  onLogout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userId');
    this.flag=false;
    this.router.navigateByUrl('/user/login');
  }

}
