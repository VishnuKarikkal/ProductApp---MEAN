import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  
private _productsUrl='http://localhost:3232/api/products';
private _productUrl='http://localhost:3232/api/product';
private _newProductUrl='http://localhost:3232/api/newProducts';
private _deleteProductUrl='http://localhost:3232/api/deleteProduct';
private _updateProductUrl='http://localhost:3232/api/updateProduct';

  constructor(private http:HttpClient) { }
  getProducts()
  {
    return this.http.get(this._productsUrl);
  }
  getProduct(id)
  {
    return this.http.post(this._productUrl,{"id":id});
  }
  addProducts(item)
  {
    console.log(item);
    return this.http.post(this._newProductUrl,{"product":item}).subscribe((data)=>
                                                                          {
                                                                          console.log(data);
                                                                          })
  }
  deleteProduct(id)
  {
    console.log(id);
    return this.http.post(this._deleteProductUrl,{"id":id}).subscribe((status)=>
                                                            {
                                                              console.log(status);
                                                            });
  }
  updateProduct(item)
  {
    console.log(item);
    return this.http.post(this._updateProductUrl,{"product":item}).subscribe((status)=>
                                                           {
                                                              console.log("Updated One Document!");
                                                           });                                                        
  }
}
