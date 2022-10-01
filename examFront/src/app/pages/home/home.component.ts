import { ProductService } from './../../services/product.service';
import { Component, OnInit,ViewChild } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { Product } from 'src/app/models/product.model';

import { ProduitService } from 'src/app/services/produit.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { NgbCarousel } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  productDetails=[];
  @ViewChild('carousel', { static: true }) carousel: NgbCarousel;

  constructor(private productService:ProductService,public crudApi: ProduitService) { }
 
  ngOnInit(): void {
 
    //this.getAllProducts();

  }
 
  content:string=" [81WH007TFE] Écran 14 HD - Processeur: Intel Celeron N4020 (1,10 GHz up to 2.80 GHz , 4Mo de mémoire cache, Dual-Core) - Système d'exploitation: FreeDos - Mémoire RAM: 4 Go DDR4-2400 - Disque Dur: 1 To HDD - Carte Graphique: Intel UHD Graphics 600 avec Wi-Fi, Bluetooth, 1x USB 2.0, 2x USB 3.2 Gen 1, 1x HDMI 1.4b, 1x prise combinée casque/microphone (3,5 mm) et lecteur de carte - Couleur: Gris - Garantie: 1 an                          Retrait en Magasin ou Livraison Gratuite pour Cet Article";

  id:any;
  drop(param:any){
  if(this.id==param){
    this.id="";
  }else{
    this.id=param;
  }
  }


  prevSlide() {
    this.carousel.prev();
  }

  nextSlide() {
    this.carousel.next();
  }

  stopSlider() {
    this.carousel.pause();
  }





  url: string = "../assets/memeT/1n.jpg";
  
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

    days:any=150;
    hours:number=1;
    mins:number=22;
    secs:number=24;

 x= setInterval(()=>{
  var futureDate=new Date("Oct 2,2022 01:26:00").getTime();
      var today=new Date().getTime();
      var distance= futureDate - today;
      this.days=Math.floor(distance/(1000*60*60*24));
      this.hours=Math.floor((distance % (1000 * 60 * 60 *24))/(1000 * 60 * 60));
      this.mins=Math.floor((distance % (1000 * 60 * 60 ))/(1000*60));
      this.secs =Math.floor((distance % (1000 * 60))/(1000));
      if(distance <0){
        clearInterval(this.x);
        this.days="Offer Is Expired";
      }
 }, 1000)



  


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
