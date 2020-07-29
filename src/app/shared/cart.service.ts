import { Injectable } from '@angular/core';
import { Book } from '../books/book';
import { Cart } from '../cart/cart';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
   
})
export class CartService {
  
  private cartItems: BehaviorSubject<Cart[]> = new BehaviorSubject([]);
  static counter: number=3;

  constructor() { }

  async sendProduct(book : Book) {
    const tempItem : Cart = new Cart(CartService.counter,book.bookId,book.title,book.imageUrl,book.rating,1,book.price);
    await this.cartItems.next([tempItem]);
    CartService.counter+=1;
  }

  async getProduct() : Promise<Observable<Cart[]>> {
    return await this.cartItems.asObservable();
  }

}
