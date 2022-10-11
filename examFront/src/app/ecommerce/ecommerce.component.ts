import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../models/product.model';
import { ProductService } from '../services/product.service';
import { OrdersComponent } from './orders/orders.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';

@Component({
  selector: 'app-ecommerce',
  templateUrl: './ecommerce.component.html',
  styleUrls: ['./ecommerce.component.css']
})
export class EcommerceComponent implements OnInit {
  orderFinished = false;
  name: any;
  showSearch = false;
  products: Product[];
  product: Product = {} as Product;
  showBtn = -1;
  showMyContainerInfo = false;

  @ViewChild('productsC')
  productsC: ProductsComponent;

  @ViewChild('shoppingCartC')
  shoppingCartC: ShoppingCartComponent;

  @ViewChild('ordersC')
  ordersC: OrdersComponent;

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
  
  }

  content:string=" [81WH007TFE] Écran 14 HD - Processeur: Intel Celeron N4020 (1,10 GHz up to 2.80 GHz , 4Mo de mémoire cache, Dual-Core) - Système d'exploitation: FreeDos - Mémoire RAM: 4 Go DDR4-2400 - Disque Dur: 1 To HDD - Carte Graphique: Intel UHD Graphics 600 avec Wi-Fi, Bluetooth, 1x USB 2.0, 2x USB 3.2 Gen 1, 1x HDMI 1.4b, 1x prise combinée casque/microphone (3,5 mm) et lecteur de carte - Couleur: Gris - Garantie: 1 an   Retrait en Magasin ou Livraison Gratuite pour Cet Article";

  finishOrder(orderFinished: boolean) {
    this.orderFinished = orderFinished;
  }
  
  reset() {
    this.orderFinished = false;
    this.productsC.reset();
    this.shoppingCartC.reset();
    this.ordersC.paid = false;
  }
  search() {
    this.productService.findByName(this.name).subscribe((products) => {
      this.products = products;
      this.showSearch = true;
    });
  }

  showUndoBtn(index) {
    this.showBtn = index;
  }
  productInfo(id: number) {
    this.productService.findProductById(id).subscribe((product) => {
      this.product = product;
    });
    this.showMyContainerInfo = !this.showMyContainerInfo;
  }
  sngleProduct(id: number) {
    this.router.navigate(['sangle/product', id]);
  }

  days:any=150;
  hours:number=1;
  mins:number=22;
  secs:number=24;

x= setInterval(()=>{
var futureDate=new Date("Oct 25,2022 01:26:00").getTime();
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

}


