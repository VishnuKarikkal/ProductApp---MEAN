import { Component, OnInit } from '@angular/core';
import {ProductsService} from '../products.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  constructor(private productsService:ProductsService) { }
title:string="Product List";
showImg:boolean=true;
products=<any>[];
  ngOnInit(): void {
    this.productsService.getProducts().subscribe((data)=>
                                                  {
                                                    this.products=JSON.parse(JSON.stringify(data));
                                                    console.log(this.products);
                                                  });
  }
imgToggler()
{
    this.showImg=!this.showImg;
}
}
