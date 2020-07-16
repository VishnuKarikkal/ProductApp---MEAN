import { Component, OnInit } from '@angular/core';
import * as jwt_decode from 'jwt-decode';

import {Router} from '@angular/router';
import { UsersService } from '../users.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public _router:Router,public user:UsersService) { }
title:string="Product Management";
  ngOnInit(): void {
  }
  logout()
  {
    localStorage.removeItem('token');
    this._router.navigate(['/']);
  }

  // welcomeUser()
  // {
  //   this.user.welcomeUser();
  // }

  identifyUserRole()
{
  let token=localStorage.getItem('token');
  
  if(!!token)
  {
    let decodedToken = jwt_decode(token,{header:true});
    let userType=decodedToken['type'];
    console.log(decodedToken);
    console.log(decodedToken['subject']);
    if(userType=='admin')
    {
      console.log("FULL ACCESS GRANTED!")
      return true;
    }
    else
    {
      console.log("FULL ACCESS GRANTED!")
      return false;
    } 
  }
  else
  {
    return false;
  }
}

}
