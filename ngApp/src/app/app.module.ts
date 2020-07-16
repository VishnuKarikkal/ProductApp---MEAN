import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ProductListComponent } from './product-list/product-list.component';
import { NewproductComponent } from './newproduct/newproduct.component';
import { EditproductComponent } from './editproduct/editproduct.component';
import { UpdateproductComponent } from './updateproduct/updateproduct.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';

import { ProductsService } from './products.service';
import { UsersService } from './users.service';

import {AuthGuard} from './auth.guard';
import {TokenInterceptorService} from './token-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProductListComponent,
    NewproductComponent,
    EditproductComponent,
    UpdateproductComponent,
    SignupComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ProductsService,UsersService,AuthGuard,
              {
               provide:HTTP_INTERCEPTORS,
               useClass:TokenInterceptorService,
               multi:true
              }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
