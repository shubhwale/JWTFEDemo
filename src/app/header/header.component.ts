import { Component, OnInit, ViewChild, ElementRef, Input, AfterContentChecked, AfterViewChecked } from '@angular/core';
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

export class HeaderComponent implements OnInit, AfterContentChecked, AfterViewChecked  {

  @Input() userDetails: UserDetails = new UserDetails();
  @ViewChild('cartItemsCount', { static: true }) cartItemsCountIcon: ElementRef;
  @ViewChild('fullName', { static: true }) fullName: ElementRef;
  @ViewChild('logoutButton', { static: true }) logoutButton: ElementRef;
  @ViewChild('loginButton', { static: true }) loginButton: ElementRef;
  bookCount: number = 0;
  static flag: boolean=false;

  constructor(private router: Router, private service: UserService) {
  }
  
  ngAfterViewChecked(): void {
    if (localStorage.getItem('userId') && HeaderComponent.flag!=true) {
      HeaderComponent.flag=true;
      this.show();
      this.toggleLog();
    }
  }

  ngOnInit(): void {
    if (localStorage.getItem('userId') && HeaderComponent.flag!=true) {
      HeaderComponent.flag=true;
      this.show();
      this.toggleLog();
    }
  }

  ngAfterContentChecked(): void {
    this.updateCartCount();
  }

  updateCartCount(): void {
    const localStoredCartItems: Cart[] = JSON.parse(localStorage.getItem("cartItems"));
    if (localStoredCartItems.length > 0) {
      this.cartItemsCountIcon.nativeElement.classList.remove('mat-badge-hidden');
      this.bookCount = localStoredCartItems.length;
    }
    else {
      this.cartItemsCountIcon.nativeElement.classList.add('mat-badge-hidden');
      this.bookCount = 0;
    }
  }

  show(): void {
    const userId: number = +localStorage.getItem("userId");
    if (userId != 0) {
      this.service.getUserDetails(userId).then((value: Object) => {
        this.userDetails.userID = value['userId'];
        this.userDetails.userFullName = value['name'];
        this.userDetails.userEmail = value['email'];
      });
    }
  }

  onLogout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userId');
    this.fullName.nativeElement.classList.add('d-none');
    this.logoutButton.nativeElement.classList.add('d-none');
    this.loginButton.nativeElement.classList.remove('d-none');
    this.router.navigateByUrl('/user/login');
  }

  toggleLog(): void {
    this.fullName.nativeElement.classList.remove('d-none');
    this.logoutButton.nativeElement.classList.remove('d-none');
    this.loginButton.nativeElement.classList.add('d-none');
    HeaderComponent.flag=false;
  }
}
