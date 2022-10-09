import { OrderService } from 'src/app/services/order.service';
import { SidebarComponent } from './../../pages/admin/sidebar/sidebar.component';
import { Router, RouterModule } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { LoginService } from './../../services/login.service';
import { Component, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { Category, Item, ITEMS, ProductOrder, ProductOrders, User } from 'src/app/models/Modal';
import { ShoppingCartComponent } from 'src/app/ecommerce/shopping-cart/shopping-cart.component';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn=false;
  categories: Category[];
  user:any=null;
  total: number;
  orders: ProductOrders;
  sub: Subscription;
  radioSel: any;
  priceDelivery: number;
  radioSelected: string;
  radioSelectedString: string;
  itemsList: Item[] = ITEMS;
  orderFinished: boolean;
  @ViewChild('shoppingCartC')
  shoppingCartC: ShoppingCartComponent;

  @Output() onOrderFinished: EventEmitter<boolean>;
  constructor(public login :LoginService,public dialog: MatDialog, private categoryService: CategoryService,public userService:UserService,private router:Router,private orderService:OrderService) {
    this.total = 0;
    this.orderFinished = false;
    this.onOrderFinished = new EventEmitter<boolean>();

    this.itemsList = ITEMS;
    this.radioSelected = 'item_1';
    this.getSelecteditem();
   }


  
  ngOnInit(): void { 
    this.isLoggedIn=this.login.isLoggedIn();
    this.user=this.login.getUser();
    this.login.loginStatusSubject.asObservable().subscribe(data=>{
      this.isLoggedIn=this.login.isLoggedIn();
      this.user=this.login.getUser();
    
    });
    console.log(this.user);
    
    this.categoryService.findAllCategories().subscribe(categories => {
      this.categories = categories;
    });
    this.orders = new ProductOrders();
    this.loadCart();
    this.loadTotal();

    this.itemsList.forEach((item) => {
      this.onItemChange(item);
    });
    this.priceDelivery = 1.99;
  }

public logout(){
  this.login.logout();
  this.login.loginStatusSubject.next(false);
}

id:any;
  drop(param:any){
  if(this.id==param){
    this.id="";
  }else{
    this.id=param;
  }
  }


  ShowCart(idUser: number) {
    this.dialog.open(SidebarComponent, {
      data: { idUser }
    })
  }

  private calculateTotal(products: ProductOrder[]): number {
    let sum = 0;
    products.forEach((value) => {
      sum += value.product.productActualPrice * value.quantity;
    });
    return sum + this.priceDelivery;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  finishOrder() {
    this.orderFinished = true;
    this.orderService.Total = this.total;
    this.onOrderFinished.emit(this.orderFinished);
  }

  loadTotal() {
    this.sub = this.orderService.OrdersChanged.subscribe(() => {
      this.total = this.calculateTotal(this.orders.productOrders);
    });
  }

  loadCart() {
    this.sub = this.orderService.ProductOrderChanged.subscribe(() => {
      let productOrder = this.orderService.SelectedProductOrder;
      if (productOrder) {
        this.orders.productOrders.push(
          new ProductOrder(productOrder.product, productOrder.quantity)
        );
      }
      this.orderService.ProductOrders = this.orders;
      this.orders = this.orderService.ProductOrders;
      this.total = this.calculateTotal(this.orders.productOrders);
    });
  }

  reset() {
    this.orderFinished = false;
    this.orders = new ProductOrders();
    this.orders.productOrders = [];
    this.loadTotal();
    this.total = 0;
  }
  getSelecteditem() {
    this.radioSel = ITEMS.find((Item) => Item.value === this.radioSelected);
    this.radioSelectedString = JSON.stringify(this.radioSel);
  }

  onItemChange(item: any) {
    this.getSelecteditem();
    this.priceDelivery = item.price;
  }
}
