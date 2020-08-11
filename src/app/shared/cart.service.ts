import { Injectable } from '@angular/core';
import { Book } from '../books/book';
import { Cart } from '../cart/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  counter: number=1;
  constructor() { }

  addToCartService(book: Book): boolean {
    var status: boolean = false;
    var localStoredCartItems: Cart[] = JSON.parse(localStorage.getItem("cartItems"));
    if (localStoredCartItems) {
      var size: number = localStoredCartItems.length;
      loop: for (var i = 0; i <= size; i++) {
        var item: Cart = localStoredCartItems[i];
        if (i == size) {
          localStoredCartItems.push(new Cart(this.counter++, book.bookId, book.title,
            book.imageUrl, book.rating, 1, book.price));
          localStorage.setItem("cartItems", JSON.stringify(localStoredCartItems));
          status = true;
        }
        else if (item.bookId == book.bookId) {
          break loop;
        }
        else {
          continue loop;
        }
      }
    }
    return status
  }
}
