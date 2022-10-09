import { LoginService } from './../../services/login.service';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginComponent } from 'src/app/pages/login/login.component';
import { ProductOrder,  ProductOrders, UpdateProduct, Tag, User, Comment, Cart, Product } from 'src/app/models/Modal';


import { CartService } from 'src/app/services/cart.service';
import { CommentService } from 'src/app/services/comment.service';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';
import { TagService } from 'src/app/services/tag.service';
import { UserService } from 'src/app/services/user.service';
import { OrdersComponent } from '../orders/orders.component';
import { ShoppingCartComponent } from '../shopping-cart/shopping-cart.component';



@Component({
  selector: 'app-sangle-product',
  templateUrl: './sangle-product.component.html',
  styleUrls: ['./sangle-product.component.scss','./sangle-product.component.css']
})
export class SangleProductComponent implements OnInit {
  name: string;
  user: User = {} as User;
  productOrders: ProductOrder[] = [];
  products: Product[] = [];
  tags: Tag[] = [];
  comment: Comment = {} as Comment;
  comments: Comment[];
  cartExist: Cart = {} as Cart;
  cart: Cart = {} as Cart;
  selectedProductOrder: ProductOrder;
  shoppingCartOrders: ProductOrders;
  sub: Subscription;
  productSelected: boolean = false;
  collapsed = true;
  orderFinished = false;
  showBtn = -1;
  submitted = false;
  isLoggedIn=false;
  @ViewChild('shoppingCartC')
  shoppingCartC: ShoppingCartComponent;

  @ViewChild('ordersC')
  ordersC: OrdersComponent;

  description: string = '';
  showMyContainerInfo: boolean = false;

  idProduct: number;
  product: UpdateProduct;

  counter: number = 1;
  @Input() url = location.href;

  constructor(private productService: ProductService, private tagService: TagService,
    private orderService: OrderService, private route: ActivatedRoute, private userService: UserService,
    private commentService: CommentService, private dialog: MatDialog,
    private cartService: CartService,public loginn :LoginService) {

  }

  ngOnInit() {
    this.loadOrders();
    this.sangleProduct();
    this.isLoggedIn=this.loginn.isLoggedIn();
    this.user=this.loginn.getUser();
    this.loginn.loginStatusSubject.asObservable().subscribe(data=>{
      this.isLoggedIn=this.loginn.isLoggedIn();
      this.user=this.loginn.getUser();
      
    });
   
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



  addToCart(order: ProductOrder, idUser) {
    this.orderService.SelectedProductOrder = order;
    this.selectedProductOrder = this.orderService.SelectedProductOrder;
    this.productSelected = true;
    this.cart.name = order.product.productName;
    this.cart.price = order.product.productActualPrice;
    this.cart.quantity = order.quantity;
    this.cart.pictureUrl = order.product.fileName;

    this.cartService.addCartToUser(this.cart, idUser).subscribe(cart => {
      this.cart = cart;
      console.log(cart);
      this.cartService.saveCartName(this.cart.name);
    })
  }

  removeFromCart(productOrder: ProductOrder, idUser) {
    let index = this.getProductIndex(productOrder.product);
    if (index > -1) {
      this.shoppingCartOrders.productOrders.splice(
        this.getProductIndex(productOrder.product), 1);
      const name = this.cartService.getCartName();
      this.cartService.findCartsForUser(idUser).subscribe(carts => {
        this.cartExist = carts.filter(item => item.name === name)[0];
        this.cartService.removeFromCart(this.cartExist.id, idUser).subscribe(() => {
        })
      })
    }
    this.orderService.ProductOrders = this.shoppingCartOrders;
    this.shoppingCartOrders = this.orderService.ProductOrders;
    this.productSelected = false;
  }

  getProductIndex(product: Product): number {
    return this.orderService.ProductOrders.productOrders.findIndex(
      value => value.product === product);
  }

  isProductSelected(product: Product): boolean {
    return this.getProductIndex(product) > -1;
  }

  loadOrders() {
    this.sub = this.orderService.OrdersChanged.subscribe(() => {
      this.shoppingCartOrders = this.orderService.ProductOrders;
    });
  }

  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
  }

  finishOrder(orderFinished: boolean) {
    this.orderFinished = orderFinished;
  }

  reset() {
    this.productOrders = [];
    this.orderService.ProductOrders.productOrders = [];
    this.loadOrders();
    this.productSelected = false;
    this.orderFinished = false;
    this.shoppingCartC.reset();
    this.ordersC.paid = false;
  }

  private sangleProduct() {
    this.product = new UpdateProduct();
    this.idProduct = this.route.snapshot.params['idProduct'];
    this.tagService.findTagsForProduct(this.idProduct).subscribe(tags => {
      this.tags = tags;
    });
    this.commentService.findCommentsForProduct(this.idProduct).subscribe(comments => {
      this.comments = comments;
    });
    this.productService.findProductById(this.idProduct).subscribe(data => {
      this.name = data.productName;
      this.productService.findByName(this.name).subscribe((products: any[]) => {
        this.products = products;
        this.products.forEach(product => {
          this.productOrders.push(new ProductOrder(product, 0));
        });
      });
      this.submitted = true;
    });
  }
  addComment(idProduct, username) {
    this.comment.addedBy = username;
    this.commentService.addCommentToProduct(this.comment, idProduct).subscribe(comment => {
      this.comment = comment;
      window.location.reload();
    })
  }
  login() {
    this.dialog.open(LoginComponent);
  }
}
