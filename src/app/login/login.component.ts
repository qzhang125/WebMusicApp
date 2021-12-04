import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private a: AuthService,private router: Router) { }
  user = {userName: "", password: "", _id: ""};
  warning = "";
  loading = false;
  ngOnInit(): void {
  }
  onSubmit(f: NgForm){
    if(this.user.userName != "" && this.user.password != ""){
      this.a.login(this.user).subscribe(res=>{
        // TODO: Add res.token to localstorage
        localStorage.setItem("access_token", res.token);
        this.loading = false;
        this.router.navigate(['/newReleases']);
        //return res;
      }, err=>{
        this.warning = err.error.message;
        this.loading = false;
      });
    }
  }

}
