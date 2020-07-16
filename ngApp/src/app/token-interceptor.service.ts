import { Injectable,Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { UsersService } from './users.service';
@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private injector:Injector) { }
  intercept(req,nxt)
  {
    let usersService=this.injector.get(UsersService);
    let tokenizedReq = req.clone(
                {
                  setHeaders:{
                            Authorization:`Bearer ${usersService.getToken()}`
                            }
                }
                                )
    return nxt.handle(tokenizedReq);
  }
}
