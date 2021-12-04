import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private a: AuthService) { }
  registerUser = {userName: "", password: "", password2: ""};
  warning: string = "";
  success = false;
  loading = false;
  ngOnInit(): void {
  }
  onSubmit(f: NgForm){
    if(this.registerUser.userName != "" &&
    this.registerUser.password != "" && this.registerUser.password2 != "" ){
      console.log("submitting");
      this.loading = true;
      this.a.register(this.registerUser).subscribe(()=>{
        this.success = true;
        this.warning = "";
        this.loading = false;
      }, err =>{
        console.log("error!");
        console.log(err.error.message);
        this.success = false;
        this.loading = false;
        this.warning = err.error.message;
      });
    }
  }
}
