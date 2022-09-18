import { FileHandle } from './../../../models/file-handle.model';

import { ProductService } from './../../../services/product.service';
import { Component, OnInit } from '@angular/core';

import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Product } from 'src/app/models/product.model';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.css']
})
export class AddNewProductComponent implements OnInit {

  product:Product={
    productName: '',
    productDescription: '',
    productDiscountPrice: 0,
    productActualPrice: 0,
    productImages: []
  }
  constructor(private productService:ProductService,private sanitizer:DomSanitizer) { }

  ngOnInit(): void {
  }
  addProduct(productForm){

    const productformData=this.prepareFormData(this.product);
    //console.log(this.product)
    this.productService.addProduct(productformData).subscribe((data:Product)=>{
      //console.log(data);
      productForm.reset();
    },
    (error: HttpErrorResponse) => {
        console.log(error);
      }
    )
  }
prepareFormData(product:Product):FormData{
  const formData=new FormData();
  formData.append('product',new Blob([JSON.stringify(product)],{type:'application/json'}));
for(var i=0;i<product.productImages.length;i++){
  formData.append(
    'imageFile',
    product.productImages[i].file,
    product.productImages[i].file.name
  );
}
  return formData;
}



  onFileSelected(event){
    if(event.target.files){
    const file=  event.target.files[0];
    const fileHandle:FileHandle={
      file:file,
      url: this.sanitizer.bypassSecurityTrustUrl(
         window.URL.createObjectURL(file))
       

    }
    this.product.productImages.push(fileHandle);
   
  }
  
}

}
