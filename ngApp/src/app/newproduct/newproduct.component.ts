import { Component, OnInit } from '@angular/core';
import {ProductsService} from '../products.service';
import {ReactiveFormsModule,FormBuilder,Validators} from '@angular/forms';
import {Router} from '@angular/router';
import { from } from 'rxjs';
import {ProductModel} from '../product-list/productmodel';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-newproduct',
  templateUrl: './newproduct.component.html',
  styleUrls: ['./newproduct.component.css']
})
export class NewproductComponent implements OnInit {

title="Add New Product";
  constructor(private _productsService:ProductsService,private router:Router,private formBuilder:FormBuilder) { }
  productItem=new ProductModel(null,null,null,null,null,null,null,null);
  newProductForm= this.formBuilder.group
  ({
    p_id:['',Validators.required],
    p_name:['',Validators.required],
    p_code:['',Validators.required],
    p_date:['',Validators.required],
    p_des:['',Validators.required],
    p_price:['',Validators.required],
    p_rating:['',[Validators.required,Validators.pattern(/^([1-5])$/)]], //rating: >1--5<
    p_img:['',Validators.required]
  })
  ngOnInit(): void {
  }
addProduct()
{
  console.log("Adding New Product");
  this._productsService.addProducts(this.productItem);
  console.log("Product added!");
  alert("Product added!");
  this.router.navigate(['/']);
}
}
