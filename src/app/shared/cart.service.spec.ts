import { TestBed } from '@angular/core/testing';
import { CartService } from './cart.service';
import { Book } from '../books/book';
import { Cart } from '../cart/cart';


xdescribe('CartService', () => {
  let service: CartService;
  let book: Book;
  let cartItem: Cart;
  let cartItems: Cart[];
  let counter: number;

  beforeAll(() => {
    cartItems = [];
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    counter = 1;
  });

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartService);
    book = new Book();
    book.bookId = 1;
    book.title = "abc";
    book.imageUrl = "abc.jpeg";
    book.author = "pqr";
    book.publisher = "xyz";
    book.noOfPages = 123;
    book.rating = 3;
    book.edition = 1;
    book.price = 123;
    book.releaseDate = new Date();
    cartItem = new Cart(counter++, book.bookId, book.title, book.imageUrl, book.rating, 1, book.price);
  });

  afterAll(() => {
    cartItems = [];
    localStorage.removeItem('cartItems');
    book = null;
    cartItem = null;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('checks if addToCartService function is present', () => {
    expect(service.addToCartService).toBeTruthy()
  });

  it('should insert book in local storage', () => {
    const status = service.addToCartService(book);
    expect(status).toBe('Success');
  });

  it('should not insert duplicate book in local storage', () => {
    const status = service.addToCartService(book);
    expect(status).toBe('Duplicate');
  });
});
