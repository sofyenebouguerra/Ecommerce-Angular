import { Product } from 'src/app/models/product.model';

import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
 
  host: string = 'http://localhost:8086/product';
  list: Product[];
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

  public deleteProductM(productId:number){
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

  addProductToCategory(product: Product, idCategory: number): Observable<Product> {
    return this.http.post<Product>(`http://localhost:8086/product/addProductToCategory/${idCategory}`, product);
  }

  editProduct(product: Product, id: number): Observable<Product> {
    return this.http.put<Product>(`http://localhost:8086/product/editProduct/${id}`, product);
  }

  deleteProduct(id: number): Observable<Product> {
    return this.http.delete<Product>(`http://localhost:8086/product/deleteProduct/${id}`);
  }

  findProductById(productId: number): Observable<Product> {
    return this.http.get<Product>(`http://localhost:8086/product/findProductById/${productId}`);
  }

  findAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`http://localhost:8086/product/findAllProducts`);
  }

  findProductsForCategory(idCategory: number): Observable<Product[]> {
    return this.http.get<Product[]>(`http://localhost:8086/product/findProductsForCategory/${idCategory}`);
  }
  deleteProductFromTag(idProduct: number, idTag: number): Observable<Product> {
    return this.http.delete<Product>(`http://localhost:8086/product/deleteProductFromTag/${idProduct}/${idTag}`);
  }
  findByName(name: string): Observable<Product[]> {
    return this.http.get<Product[]>(`http://localhost:8086/product/findByName/${name}`);
  }

}
