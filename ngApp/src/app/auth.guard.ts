import { Injectable } from '@angular/core';
import { CanActivate, Router,ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {UsersService} from './users.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private userService:UsersService,private _router:Router)
  {

  }
  canActivate():boolean
  {
    if(this.userService.loggedIn())
    {
      //console.log(true);
      return true;
    }
    else
    {
      this._router.navigate(['/login']);
      return false;
    }
  }
  
}
