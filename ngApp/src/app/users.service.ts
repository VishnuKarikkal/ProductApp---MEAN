import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import * as jwt_decode from 'jwt-decode';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private _signupUrl='http://localhost:3232/api/signup';
  private _signinUrl='http://localhost:3232/api/signin';

  constructor(private http:HttpClient) { }

  signup(user)
  {
    console.log(user);
    return this.http.post(this._signupUrl,{"user":user}).subscribe((data)=>
                                                                         {
                                                                         console.log(data);
                                                                         })
  }
  signin(user)
  {
    console.log("serv");
    console.log(user);
    return this.http.post(this._signinUrl,{"user":user});
                                                             
  }
  loggedIn()
  {
    //console.log(!!localStorage.getItem('token'));
    return !!localStorage.getItem('token');
  }
  getToken()
  {
    return localStorage.getItem('token');
  }
  identifyUserRole()
{
  let token=localStorage.getItem('token');

  if(!!token)
  {
    let decodedToken = jwt_decode(token);
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

// welcomeUser()
// {
//   let token=localStorage.getItem('token');

//   if(!!token)
//   {
//     let decodedToken = jwt_decode(token);
//    // console.log(decodedToken);
//    let id= decodedToken['subject'];

//     console.log("Header"+id);
//     this.http.post('http://localhost:3232/api/welcome',{"id":id});
//   }
// }
}
