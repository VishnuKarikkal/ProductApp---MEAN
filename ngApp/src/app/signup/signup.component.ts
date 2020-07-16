import { Component, OnInit } from '@angular/core';
import {ReactiveFormsModule,FormBuilder,Validators} from '@angular/forms';
import { UsersService } from '../users.service';
import {Router} from '@angular/router';
import {UserModel} from './usermodel';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
userData=new UserModel(null,null,null,null);
  constructor(private usersService:UsersService,private router:Router,private formBuilder:FormBuilder) { }
signupform= this.formBuilder.group
({
  name:['',[Validators.pattern(/^([a-zA-Z]+|[a-zA-Z]+\s{1}[a-zA-Z]{1,}|[a-zA-Z]+\s{1}[a-zA-Z]{1,}\s{1}[a-zA-Z]{1,})$/)]],
  email:['',[Validators.pattern(/^([\w\.\-]+)@([\w\-]+)\.([a-z]{2,3})(\.[a-z]{2,3})?$/)]],
  password:['',[Validators.minLength(8),Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%&*])(?=.*[0-9])(?!.*\s).{8,}$/)]]
})
  ngOnInit(): void {
  }
signup()
{
  console.log("Adding New User Account");
    if(document.getElementById('radioNormal')['checked'])   //checking user-type selected
    {
    this.userData.type='normal';
    }
   else
    {
    this.userData.type='admin';
    }
   
  this.usersService.signup(this.userData);
  console.log("Account added!");
  alert("Account added!");
  this.router.navigate(['/login']);
}
}
