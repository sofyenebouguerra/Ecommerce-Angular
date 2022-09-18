import { HttpErrorResponse } from '@angular/common/http';
import { ProductService } from './../../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-show-product-detail',
  templateUrl: './show-product-detail.component.html',
  styleUrls: ['./show-product-detail.component.css']
})
export class ShowProductDetailComponent implements OnInit {

productDetails:Product[]=[];
displayedColumns: string[] = ['Id','Product Name', 'Product Description', 'Product Discount Price', 'Product Actual Price'];

  constructor(private ProductService:ProductService) { }

  ngOnInit(): void {
    this.getAllProducts()
  }

  public getAllProducts(){
    this.ProductService.getAllProducts().subscribe((resp:Product[])=>
    {
      console.log(resp);
      this.productDetails=resp;
    },(error:HttpErrorResponse)=>{
      console.log(error);
    }
    )
  }

}
