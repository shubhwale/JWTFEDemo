import { Component, OnInit, Input } from '@angular/core';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { Cart } from './cart';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styles: [
  ]
})
export class CartComponent implements OnInit {

  public cartComponentRef = CartComponent;

  @Input() static cartItems : Cart[]= [];
  
  totalPrice: number=0;

  constructor(config: NgbRatingConfig) { 
    config.readonly = true;
    config.max=5;
  }

  quantityArray: number[] = [1,2,3,4,5];

  ngOnInit() : void {
      if(localStorage.getItem("cartItems")==null) {
        localStorage.setItem("cartItems",JSON.stringify(CartComponent.cartItems));
      }
      this.populateCart();
      this.totalPrice=0;
      CartComponent.cartItems.forEach( item => {
        this.totalPrice+=(item.quantity*item.price);
      });
  }

  populateCart(): void {
    if(localStorage.getItem("cartItems").length>0) {
      const localStoredCartItems : Cart[]= JSON.parse(localStorage.getItem("cartItems")) ;
      if(localStoredCartItems.length>0) {
        loop: for(var i of localStoredCartItems) {
          for(var j of CartComponent.cartItems) {
            if(i.bookId==j.bookId) {
              continue loop;
            }
          }
          CartComponent.cartItems.push(i);
        }
      }
    }
    localStorage.setItem("cartItems",JSON.stringify(CartComponent.cartItems));
  }

  updateTotalPrice(): void {
    this.totalPrice=0;
    CartComponent.cartItems.forEach( (item: Cart) => {
      this.totalPrice+=(item.quantity*item.price);
    });
    localStorage.setItem("cartItems",JSON.stringify(CartComponent.cartItems));
  }

  removeCartItem(index: number): void {
    CartComponent.cartItems.splice(index,1);
    localStorage.setItem("cartItems",JSON.stringify(CartComponent.cartItems));
  }
}
