import { Component, OnInit } from '@angular/core';
import {ProductsService} from '../products.service';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import { UpdateproductComponent } from '../updateproduct/updateproduct.component';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-editproduct',
  templateUrl: './editproduct.component.html',
  styleUrls: ['./editproduct.component.css']
})
export class EditproductComponent implements OnInit {
  title:string="Choose Preffered Edit Action";
  showImg:boolean=true;
  products=<any>[];
  constructor(private productsService:ProductsService,private router:Router) { }

  ngOnInit(): void {
    this.productsService.getProducts().subscribe((data)=>
                                                  {
                                                    this.products=JSON.parse(JSON.stringify(data));
                                                    console.log(this.products);
                                                  },
                                                  (err)=>{
                                                    if(err instanceof HttpErrorResponse)
                                                    {
                                                      if(err.status==401)
                                                      {
                                                        this.router.navigate(['/login']);
                                                      }
                                                    }
                                                    console.log(err);
                                                          }
                                                                                  );
  }

  deleteProduct(id)
  {
    console.log("delete call"+id);
    
    this.productsService.deleteProduct(id);
    
    console.log("Product Deleted!");
    alert("Product Deleted!");
    this.router.navigate(['/']);
  }

  // editProduct(id)
  // {
  //   console.log("update call"+id);
  //   this.productsService.updateProduct(id);
  // }

}
