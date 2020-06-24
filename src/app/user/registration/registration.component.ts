import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { ToastrComponentlessModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html'
  //styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(public service : UserService,private toastr : ToastrService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.service.register().subscribe(
      (res:any) => {
        if(res.succeeded) {
          this.service.formModel.reset();
          this.toastr.success('New User created','Registration succesful');
        }
        else {
          res.errors.forEach(element => {
            switch(element.code) {
              case 'DuplicateUserName' : 
                this.toastr.error('Username already taken','Registration failed');
                //UserName is already taken
                break;
              default :
              this.toastr.error(element.description,'Registration failed');
                //Registration failed
                break;
            }
          });
        }
      },
      err => {
        console.log(err);
      }
    );
  }

}
