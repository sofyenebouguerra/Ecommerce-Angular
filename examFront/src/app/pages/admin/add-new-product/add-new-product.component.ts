
import { ProductService } from './../../../services/product.service';
import { Component, OnInit } from '@angular/core';

import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Product } from 'src/app/services/product.model';

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
    productActualPrice: 0
  }
  constructor(private productService:ProductService) { }

  ngOnInit(): void {
  }
  addProduct(productForm){
    //console.log(this.product)
    this.productService.addProduct(this.product).subscribe((data:Product)=>{
      //console.log(data);
      productForm.reset();
    },
    (error: HttpErrorResponse) => {
        console.log(error);
      }
    )
  }

}
