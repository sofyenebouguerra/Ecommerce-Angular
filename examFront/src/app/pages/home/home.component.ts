import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { Product } from 'src/app/models/product.model';
import { ImageProcessingService } from 'src/app/services/image-processing.service';
import { ProduitService } from 'src/app/services/produit.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  productDetails=[];
  

  constructor(private productService:ProductService,private imageProcessingService:ImageProcessingService,public crudApi: ProduitService) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  url: string = "../assets/6n.jpg";
  
    imageChange(event: any){
        this.url = event.target.src;
    }

public getAllProducts(){
  this.productService.getAllProducts()
  /*.pipe(
   map((x:Product[],i)=>x.map((product:Product)=>this.imageProcessingService.createImages(product)))
  )*/
  
  .subscribe((resp:Product[])=>
  {
    console.log(resp);
    this.productDetails=resp;
  
  },(error:HttpErrorResponse)=>{
    console.log(error);
  }
  );
}

}
