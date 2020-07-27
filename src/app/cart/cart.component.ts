import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styles: [
  ]
})
export class CartComponent implements OnInit {

  cartItems = [
    {bookId: 101, title: "abc", imageUrl: "assets/images/java8_in_action.jpeg",
    rating: 4, quantity: 1, price: 300},
    {bookId: 102, title: "abc", imageUrl: "assets/images/head_first_servlet_&_jsp.jpg",
    rating: 4, quantity: 1, price: 300}
  ];

  constructor() { }

  ngOnInit(): void {
    
  }

}
