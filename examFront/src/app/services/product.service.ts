import { Product } from 'src/app/services/product.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }
  public addProduct(product:Product){
    return this.http.post<Product>(`${baseUrl}/product/`,product);
  }
}
