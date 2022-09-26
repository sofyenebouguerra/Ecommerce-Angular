import { SafeUrl } from '@angular/platform-browser';
import { ImageProcessingService } from './image-processing.service';
import { ProductService } from './product.service';
import { map, Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Product } from '../models/product.model';


@Injectable({
  providedIn: 'root'
})
export class ProductResolveService implements Resolve<Product> {

  constructor(private productService:ProductService,private imageProcessingService:ImageProcessingService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<Product> {
const id=route.paramMap.get("productId");

if(id){
//then we have to fetch deatails from backend
return this.productService.getProductDetailsById(id)
.pipe(
  map(p=> this.imageProcessingService.createImages(p))
);

      }else{
//return empty product obsrvable
return of(this.getProductDetails());
  }
}
getProductDetails(){
  return{
    productId:0,
    productName: "",
    productDescription: "",
    productDiscountPrice: 0,
    productActualPrice: 0,
    productImages:[]

  };
}


}