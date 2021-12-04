/*********************************************************************************
* WEB422 – Assignment 06
* I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part of this
* assignment has been copied manually or electronically from any other source (including web sites) or
* distributed to other students.
*
* Name: _____Qiuyu Zhang_________________ Student ID: __135922193____________ Date: _____Dec.03, 2021___________
*
* Angular App (Deployed) Link: _____________________________________________________
*
* User API (Heroku) Link: ________https://web422a5userapi.herokuapp.com/api/user/__________________________________________________
*
********************************************************************************/
import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router, Event } from '@angular/router';
import { AuthService } from './auth.service';
import User from './User';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'web422-a6';
  searchString : string = "";
  token: User | null = null;
  constructor(private router: Router, private a: AuthService){}
  ngOnInit(){
    this.router.events.subscribe((event: Event)=> {
      if(event instanceof NavigationStart){
        this.token = this.a.readToken();
      }
    })
  };

  handleSearch(){
    this.router.navigate(['/search'],{queryParams: {q: this.searchString}});
    this.searchString = "";
  };

  logOut(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }
  
}
