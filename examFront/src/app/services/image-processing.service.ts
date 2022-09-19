import { DomSanitizer } from '@angular/platform-browser';
import { Injectable } from '@angular/core';
import { FileHandle } from '../models/file-handle.model';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ImageProcessingService {

  constructor(private sanitizer:DomSanitizer) { }

  public createImages(product:Product){
    const productImages:any[] =product.productImages;
    const productImagesToFileHandle:FileHandle[] =[];
    for(let i=0;i<productImages.length;i++){
      const imageFileData=productImages[i];

    const imageBlob=  this.dataURItoBlob(imageFileData.picByte,imageFileData.type);
    const imageFile=new File([imageBlob],imageFileData.name,{type:imageFileData.type});
    const finalFileHandle:FileHandle={
      file:imageFile,
      url:this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(imageFile))
    };
    productImagesToFileHandle.push(finalFileHandle);
  }
  product.productImages=productImagesToFileHandle;
  return product;
  }

  public dataURItoBlob(picBytes,imageType){
    const byteString=window.atob(picBytes);
    const arrayBuffer=new ArrayBuffer(byteString.length);
    const int8array = new Uint8Array(arrayBuffer);

    for(let i=0;i<byteString.length;i++){
      Int8Array[i]=byteString.charCodeAt(i);
    }

    const blob=new Blob([int8array],{type: imageType});
    return blob;
  }

}
