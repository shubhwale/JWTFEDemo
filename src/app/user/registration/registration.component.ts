import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { ToastrService } from 'ngx-toastr';
import { UserComponent } from '../user.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html'
  //styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(public service : UserService,private toastr : ToastrService, public user : UserComponent, private router : Router) { }

  //array of data
  myCities: {};
  myStates: {};
  gender: string[] = ['Male','Female','Others'];

  
  ngOnInit(): void {
    this.service.getCities().subscribe(cityList =>{
      this.myCities = cityList;
    });
    this.service.getStates().subscribe(stateList =>{
      this.myStates = stateList;
    });
  }

  onSubmit() {
    var body = {
      Name : this.user.formModel.value.Name,
      Email : this.user.formModel.value.Email,
      Password : this.user.formModel.value.Passwords.Password,
      Contact : parseInt(this.user.formModel.value.Contact),
      Gender : this.user.formModel.value.Gender,
      AddressLine : this.user.formModel.value.AddressLine,
      CityID : parseInt(this.user.formModel.value.City),
      StateID : parseInt(this.user.formModel.value.State),
    };
    this.service.register(body).subscribe(
      (res:any) => {
        if(res.hasOwnProperty('userId')) {
          this.user.formModel.reset();
          this.toastr.success('New User created','Registration succesful');
          this.router.navigateByUrl("/user/login");          
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
