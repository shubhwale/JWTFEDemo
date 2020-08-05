import { Component, OnInit, Input, ViewChild, ElementRef, SimpleChange } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';
import { UserDetails } from '../header/UserDetails';
import { Cart } from '../cart/cart';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})

export class HeaderComponent implements OnInit {

  @Input() static userDetails : UserDetails= new UserDetails();;
  @ViewChild('cartItemsCount', { static: true }) cartItemsCountIcon: ElementRef;
  @ViewChild('name', { static: true }) name: ElementRef;
  @ViewChild('login', { static: true }) login: ElementRef;
  @ViewChild('logout', { static: true }) logout: ElementRef;
  static count: number= 0;
  flag: boolean=false;
  classReference: typeof HeaderComponent = HeaderComponent

  constructor(private router : Router,private service : UserService) {
  }

  ngOnInit(): void {
    this.show();
    if(HeaderComponent.userDetails.userID) {
      this.flag=true;
    }
  }

  ngAfterContentChecked(): void {
    this.updateCartCount();
  }

  ngAfterViewChecked(): void {
    this.toggleLog();
  }

  toggleLog(): void {
    if(HeaderComponent.userDetails.userID && !this.flag) {
      this.name.nativeElement.classList.remove('d-none');
      this.logout.nativeElement.classList.remove('d-none');
      this.login.nativeElement.classList.add('d-none');
      this.flag=true;
    }
  }

 updateCartCount(): void {
    const localStoredCartItems : Cart[]= JSON.parse(localStorage.getItem("cartItems"));
    if(localStoredCartItems.length>0) {
      this.cartItemsCountIcon.nativeElement.classList.remove('mat-badge-hidden');
      HeaderComponent.count=localStoredCartItems.length;
    }
    else {
      this.cartItemsCountIcon.nativeElement.classList.add('mat-badge-hidden');
      HeaderComponent.count=0;
    }
  }

  show(): void {
    const userId : number = +localStorage.getItem("userId");
    if(userId!=0) {
      this.service.getUserDetails(userId).then((value: Object) => {
        HeaderComponent.userDetails.userID=value['userId'];
        HeaderComponent.userDetails.userFullName=value['name'];
        HeaderComponent.userDetails.userEmail=value['email'];
      });
    }
  }

  onLogout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userId');
    this.name.nativeElement.classList.add('d-none');
    this.logout.nativeElement.classList.add('d-none');
    this.login.nativeElement.classList.remove('d-none');
    this.flag=false;
    this.router.navigateByUrl('/user/login');
  }
}
