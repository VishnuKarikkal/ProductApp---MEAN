import { Component, OnInit, OnDestroy } from '@angular/core';
import {ReactiveFormsModule,FormBuilder,Validators} from '@angular/forms';
import {ProductsService} from '../products.service';
import {FormsModule} from '@angular/forms';
import {Router,ActivatedRoute} from '@angular/router';
import { from, Subscription } from 'rxjs';
import {ProductModel} from '../product-list/productmodel';
import {EditproductComponent} from '../editproduct/editproduct.component';
@Component({
  selector: 'app-updateproduct',
  templateUrl: './updateproduct.component.html',
  styleUrls: ['./updateproduct.component.css']
})
export class UpdateproductComponent implements OnInit, OnDestroy{
  title="Product Details"
productItem:ProductModel=new ProductModel(null,null,null,null,null,null,null,null);
updateProductForm= this.formBuilder.group
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
id;
sub;
  constructor(private productsService:ProductsService,private router:Router,private activatedRoute:ActivatedRoute,private formBuilder:FormBuilder) { }

  ngOnInit(): void 
  {        
     this.sub =  this.activatedRoute.paramMap.subscribe((params)=>
                                                        {
                                                this.id = params.get('id'); 
                                                console.log("id"+this.id);

                                  this.productsService.getProduct(this.id).subscribe((data)=>
                                  {
                                    this.productItem=JSON.parse(JSON.stringify(data));
                                    console.log(this.productItem);
                                  });
                                                    
                                   console.log(this.productItem);
                                                        });
  }
ngOnDestroy()
{
this.sub.unsubscribe();
}
  updateProduct()
  {
    console.log(this.productItem);
    this.productsService.updateProduct(this.productItem);
    console.log("one Product Updated!");
    alert("one Product Updated!");
    this.router.navigate(['/']);
  }
}
