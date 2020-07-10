import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { ToastrService } from 'ngx-toastr';
import { UserComponent } from '../user.component';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html'
  //styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(public service : UserService,private toastr : ToastrService, public user : UserComponent) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.service.register().subscribe(
      (res:any) => {
        if(res.hasOwnProperty('userId')) {
          this.user.formModel.reset();
          this.toastr.success('New User created','Registration succesful');
        }
        else {
          this.toastr.error('Cannot create account','Registration failed');
        }
      },
      err => {
        console.log(err);
      }
    );
  }

}
