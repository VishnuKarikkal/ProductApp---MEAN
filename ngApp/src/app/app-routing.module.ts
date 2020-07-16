import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { from } from 'rxjs';
import {ProductListComponent} from './product-list/product-list.component';
import {NewproductComponent} from './newproduct/newproduct.component';
import { EditproductComponent } from './editproduct/editproduct.component';
import {UpdateproductComponent} from './updateproduct/updateproduct.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import {AuthGuard} from './auth.guard';

const routes: Routes = [
  {
    path:'',
    component:ProductListComponent
  },
  {
    path:'newproduct',
    component:NewproductComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'editproduct',
    component:EditproductComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'updateproduct/:id',
    component:UpdateproductComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'signup',
    component:SignupComponent
  },
  {
    path:'login',
    component:LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
