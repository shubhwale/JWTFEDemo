import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/shared/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {
  formModel = {
    Email: '',
    Password: ''
  }

  constructor(private service: UserService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    if (localStorage.getItem('accessToken') != null && localStorage.getItem('refreshToken') != null) {
      this.router.navigateByUrl('/books');
    }
  }

  onSubmit(form: NgForm) {
    this.service.login(form.value).subscribe(
      (res: any) => {
        localStorage.setItem('accessToken', res.accessToken);
        localStorage.setItem('refreshToken', res.refreshToken);
        localStorage.setItem('userId', res.userId);
        this.router.navigateByUrl('/books');
      },
      err => {
        if (err.status == 401) {
          this.toastr.error('Incorrect username or password', 'Authentication failed');
        }
        else {
          console.log(err);
        }
      }
    );
  }

}
