import { Component } from '@angular/core';
import {UsersService} from './users.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Product App';
  constructor(private _userService:UsersService)
  {}
}
