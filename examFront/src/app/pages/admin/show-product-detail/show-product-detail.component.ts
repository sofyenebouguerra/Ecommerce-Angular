import { FileHandle } from './../../../models/file-handle.model';
import { ImageProcessingService } from './../../../services/image-processing.service';

import { HttpErrorResponse } from '@angular/common/http';
import { ProductService } from './../../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { MatDialog } from '@angular/material/dialog';
import { map } from 'rxjs/operators';
import { ShowProDialogComponent } from '../show-pro-dialog/show-pro-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ProduitService } from 'src/app/services/produit.service';

@Component({
  selector: 'app-show-product-detail',
  templateUrl: './show-product-detail.component.html',
  styleUrls: ['./show-product-detail.component.css']
})
export class ShowProductDetailComponent implements OnInit {

productDetails:Product[];
product:Product;
productId:number;
displayedColumns: string[] = ['Id','Product Name', 'Product Description', 'Product Discount Price', 'Product Actual Price','Images','Edit','Delete'];

  constructor(public crudApi: ProduitService ,private _route: ActivatedRoute, private productService:ProductService,public imagesDialog:MatDialog,private imageProcessingService:ImageProcessingService,private router:Router ) { }

  ngOnInit(): void {
    this.getAllProducts()
  
  }

  public getAllProducts(){
    this.productService.getAllProducts()
    .pipe(
     map((x:Product[],i) => x.map((product:Product)=>this.imageProcessingService.createImages(product)))
    )
    
    .subscribe((resp:Product[])=>
    {
      console.log(resp);
      this.productDetails=resp;
    
    },(error:HttpErrorResponse)=>{
      console.log(error);
    }
    );
  }
  /*GetOneOroduct(ProductId:number){
    this.productService.getProductDetailsById(ProductId).subscribe((response:Product)=>
    {
      console.log(response);
      this.product=response;
    });
  }*/

  deleteProduct(productId){
this.productService.deleteProduct(productId).subscribe(
  (resp)=>{
    //console.log(resp);
    this.getAllProducts();
  },(error:HttpErrorResponse)=>{
    console.log(error);
  }
)
  }
  showImages(product:Product){
 console.log(product);
 this.imagesDialog.open(ShowProDialogComponent,{
   data:{
   // images:product.productImages
     productId:this.productId,product
    
   
 },

   height:'500px',
   width:'800px'
   
 });
 
  }

  //edit
  editeProduct(productId){
 this.router.navigate(['/admin/add-product',{productId:productId}]);
  }
  

}
