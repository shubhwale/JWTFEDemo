import { Component, OnInit, Input, SimpleChange, SimpleChanges } from '@angular/core';
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

  ngOnInit(): void {
    
  }

  show(): boolean {
    const userId : number = +localStorage.getItem("userId");
    if(userId) {
      this.service.getUserDetails(userId).then((value: Object) => {
        this.userDetails.userID=value['userId'];
        this.userDetails.userFullName=value['name'];
        this.userDetails.userEmail=value['email'];
      });
      return true;
    }
    else {
      return false;
    }
  }

  onLogout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userId');
    this.router.navigateByUrl('/user/login');
  }
}
