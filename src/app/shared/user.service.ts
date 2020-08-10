import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  private readonly BaseUri = 'https://localhost:44335/api';

  register(body) {
    return this.http.post(this.BaseUri + '/users/register', body).pipe(catchError(this.handleError));
  }

  login(formData) {
    return this.http.post(this.BaseUri + '/users/login', formData);
  }

  getUserDetails(userId: number): Promise<Object> {
    return this.http.get(this.BaseUri + '/users/getuserdetails/' + userId).pipe(catchError(this.handleError)).toPromise();;
  }

  getCities() {
    return this.http.get(this.BaseUri + '/users/listcities').pipe(catchError(this.handleError));
  }

  getStates() {
    return this.http.get(this.BaseUri + '/users/liststates').pipe(catchError(this.handleError));
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
