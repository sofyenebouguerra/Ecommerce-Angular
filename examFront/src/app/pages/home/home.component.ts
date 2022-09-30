import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { Product } from 'src/app/models/product.model';
import { ImageProcessingService } from 'src/app/services/image-processing.service';
import { ProduitService } from 'src/app/services/produit.service';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  productDetails=[];
  

  constructor(private productService:ProductService,private imageProcessingService:ImageProcessingService,public crudApi: ProduitService) { }

  ngOnInit(): void {
 
    //this.getAllProducts();
  }

  url: string = "../assets/6n.jpg";
  
    imageChange(event: any){
        this.url = event.target.src;
    }

    partnersArray:any=[
      {
        imgName:"../assets/partners/j1.png"
      },
      {
        imgName:"../assets/partners/j2.png"
      },
      {
        imgName:"../assets/partners/j3.png"
      },
      {
        imgName:"../assets/partners/j4.png"
      },
      {
        imgName:"../assets/partners/j5.png"
      },
      {
        imgName:"../assets/partners/tyt.png"
      },
    ];

    customOptions: OwlOptions = {
      loop: false,
      mouseDrag: true,
      touchDrag: true,
      pullDrag: true,
      dots: false,
      navSpeed: 700,
      navText: ['', ''],
      responsive: {
        0: {
          items: 1
        },
        400: {
          items: 2
        },
        740: {
          items: 3
        },
        940: {
          items: 4
        }
      },
      nav: true
    };


    policyOptions: OwlOptions = {
      loop: true,
      mouseDrag: true,
      touchDrag: true,
      pullDrag: true,
      dots: false,
      navSpeed: 700,
      navText: ['<i class="fa fa-caret-right"></i>', '<i class="fa fa-caret-left"></i>'],
      responsive: {
        0: {
          items: 1
        },
        400: {
          items: 2
        },
        740: {
          items: 3
        },
        940: {
          items: 3
        }
      },
      nav: false
    };


    testimoniaSlider: OwlOptions = {
      loop: true,
      mouseDrag: true,
      touchDrag: true,
      pullDrag: true,
      dots: false,
      navSpeed: 700,
      navText: ['<i class="fa fa-caret-left"></i>', '<i class="fa fa-caret-right"></i>'],
      responsive: {
        0: {
          items: 1
        },
        400: {
          items: 2
        },
        740: {
          items: 3
        },
        940: {
          items: 4
        }
      },
      nav: true
    };



/*public getAllProducts(){
  this.productService.getAllProducts()
  /*.pipe(
   map((x:Product[],i)=>x.map((product:Product)=>this.imageProcessingService.createImages(product)))
  )
  
  .subscribe((resp:Product[])=>
  {
    console.log(resp);
    this.productDetails=resp;
  
  },(error:HttpErrorResponse)=>{
    console.log(error);
  }
  );
}*/

}
