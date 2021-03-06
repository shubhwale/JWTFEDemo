import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { UserComponent } from 'src/app/user/user.component'
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient, private user: UserComponent) { }
  private readonly BaseUri = 'https://localhost:44335/api';
  counter: number = 1;

  getBooks(categoryId: number = 0): Observable<Object> {
    return this.http.get(this.BaseUri + '/books?categoryid=' + categoryId).pipe(catchError(this.handleError));
  }

  getCategories(): Observable<Object> {
    return this.http.get(this.BaseUri + '/books/getcategories').pipe(catchError(this.handleError));
  }

  findBookById(id: number): Promise<Object> {
    return this.http.get(this.BaseUri + '/books/' + id).pipe(catchError(this.handleError)).toPromise();
  }

  addBook(bookData: object): Promise<Object> {
    return this.http.post(this.BaseUri + '/books/addbook', bookData, { observe: 'response' }).pipe(catchError(this.handleError)).toPromise();
  }

  editBook(bookData: object): Promise<Object> {
    return this.http.put(this.BaseUri + '/books/' + bookData['bookId'], bookData, { observe: 'response' }).pipe(catchError(this.handleError)).toPromise();
  }

  generateImageURL(title: string): string {
    var str = "assets/images/" +
      title.split(' ').join('_').toLowerCase().concat(".jpeg");
    return str;
  }

  generateDateString(jsonDate: object): string {
    var str = "";
    str = jsonDate['year'] + "-";
    var month: string = jsonDate['month'] + "";
    if (month.length == 1) {
      month = "0" + month;
    }
    var day: string = jsonDate['day'] + "";
    if (day.length == 1) {
      day = "0" + day;
    }
    str += month + "-" + day;
    return str;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened. Please try again later.');
  }
}
