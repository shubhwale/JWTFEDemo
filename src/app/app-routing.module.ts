import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { LoginComponent } from './user/login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth.guard';
import { BooksListComponent } from './books/books-list/books-list.component';
import { BookDetailsComponent } from './books/book-details/book-details.component';
import { AddBookComponent } from './books/add-book/add-book.component';



const routes: Routes = [
  {path : '', redirectTo : '/books',pathMatch : 'full'},
  {path : 'user',component : UserComponent,
  children :[
    {path : "registration",component : RegistrationComponent}, //PATH /user/registration
    {path : "login",component : LoginComponent}
  ]},
  {path : 'home',component : HomeComponent,canActivate:[AuthGuard]},
  {path : 'books',component : BooksListComponent},
  {path : 'book/:id',component : BookDetailsComponent},
  {path : 'add_book',component : AddBookComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
