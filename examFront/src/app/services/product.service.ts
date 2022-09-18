import { Product } from 'src/app/models/product.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }
  public addProduct(product:FormData){
    return this.http.post<Product>(`${baseUrl}/product/`,product);
  }
  public getAllProducts(){
    return this.http.get<Product[]>(`${baseUrl}/product/GetAll`)
  }
  public deleteProduct(productId:number){
    return this.http.delete(`${baseUrl}/product/DelPro/`+productId);
  }
}
