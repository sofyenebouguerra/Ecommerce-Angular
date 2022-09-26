import { Product } from 'src/app/models/product.model';

import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  host: string = 'http://localhost:8081';

  constructor(private http:HttpClient) { }
  public addProduct(product:FormData){
    return this.http.post<Product>(`${baseUrl}/product/`,product);
  }
  public getAllProducts(){
    return this.http.get<Product[]>(`${baseUrl}/product/GetAll`)
  }
  public getProductDetailsById (productId:any){
    return this.http.get<Product>(`${baseUrl}/product/GetOne/`+productId);
  }

  public deleteProduct(productId:number){
    return this.http.delete(`${baseUrl}/product/DelPro/`+productId);
  }



  uploadFile(file: File): Observable<HttpEvent<{}>> {
    const formdata: FormData = new FormData();
    formdata.append('file', file);
    const req = new HttpRequest('POST', '<Server URL of the file upload>', formdata, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req);
  }
}
