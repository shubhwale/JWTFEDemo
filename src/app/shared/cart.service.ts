import { Injectable } from '@angular/core';
import { Book } from '../books/book';
import { Cart } from '../cart/cart';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
   
})
export class CartService {
  
  public cartItems: BehaviorSubject<Cart[]> = new BehaviorSubject([]);
  static counter: number=3;

  constructor() { }

  sendProduct(book : Book): string {
    var status : string = "Success";
    const tempItem : Cart = new Cart(CartService.counter,book.bookId,book.title,book.imageUrl,book.rating,1,book.price);
    const values: Cart[] =  this.cartItems.getValue();
    if(values.length!=0) {
      for(var i of values) {
        if(i.bookId==tempItem.bookId) {
          status="Failed"
        }
        else {
          this.cartItems.next([tempItem]);
          CartService.counter+=1;
        }
      }
    }
    else {
      this.cartItems.next([tempItem]);
      CartService.counter+=1;
    }
    return status; 
  }

  getProduct(): Observable<Cart[]>{
    return this.cartItems.asObservable();
  }

}
