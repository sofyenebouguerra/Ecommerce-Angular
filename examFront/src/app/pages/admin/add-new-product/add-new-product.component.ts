import { FileHandle } from './../../../models/file-handle.model';

import { ProductService } from './../../../services/product.service';
import { Component, OnInit } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Product } from 'src/app/models/product.model';
import { DomSanitizer } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.css']
})
export class AddNewProductComponent implements OnInit {
isNewProduct=true;
imgURL: any;
userFile;
public imagePath;

  product:Product={
    productId:null,
    productName: '',
    productDescription: '',
    productDiscountPrice: 0,
    productActualPrice: 0,
    productImages: []
  }
  constructor(private productService:ProductService,private sanitizer:DomSanitizer,private activatedRoute:ActivatedRoute,private toastr:ToastrService) { }

  ngOnInit(): void {
   this.product= this.activatedRoute.snapshot.data['product'];
    if(this.product && this.product.productId){
      this.isNewProduct=false;
    }


  }
  addProduct(productForm:NgForm){

    const productFormData=this.prepareFormData(this.product);
    //console.log(this.product)
    this.productService.addProduct(productFormData).subscribe((response:Product)=>{
      //console.log(data);
      productForm.reset();
      this.product.productImages=[];
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
    /*if(event.target.files){
      var reader=new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload=(event:any)=>{
        this.url=event.target.result;
      }*/
   const file=  event.target.files[0];
    const fileHandle:FileHandle={
      file:file,
      url: this.sanitizer.bypassSecurityTrustUrl(
         window.URL.createObjectURL(file))
       

    }
    this.product.productImages.push(fileHandle);
   
  }
  
    

    removeImages(i:number){
      this.product.productImages.splice(i,1);
  
    }  
    fileDropped(fileHandle:FileHandle){
      this.product.productImages.push(fileHandle);
    }


    onSelectFile(event) {
      if (event.target.files.length > 0) {
        const file = event.target.files[0];
        this.userFile = file;
        // this.f['profile'].setValue(file);
  
        var mimeType = event.target.files[0].type;
        if (mimeType.match(/image\/*/) == null) {
          this.toastr.success('Only images are supported.');
  
          return;
        }
        var reader = new FileReader();
        this.imagePath = file;
        reader.readAsDataURL(file);
        reader.onload = (_event) => {
          this.imgURL = reader.result;
        }
      }
    }
}
