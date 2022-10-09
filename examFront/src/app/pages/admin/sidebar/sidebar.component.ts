import { OrdersComponent } from './../../../ecommerce/orders/orders.component';
import { User, Category } from './../../../models/Modal';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cart } from 'src/app/models/Modal';
import { CartService } from 'src/app/services/cart.service';
import { LoginService } from 'src/app/services/login.service';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ShoppingCartComponent } from 'src/app/ecommerce/shopping-cart/shopping-cart.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  user: User = {} as User;
  categories: Category[];
  carts: Cart[];
  cartLength = 0;
  orderFinished = false;
  @ViewChild('shoppingCartC')
  shoppingCartC: ShoppingCartComponent;

  @ViewChild('ordersC')
  ordersC: OrdersComponent;
  constructor(public userService: UserService, private route: ActivatedRoute, private dialog: MatDialog,
    private cartService: CartService,private  productService: ProductService,private router: Router,private login:LoginService,public toastr: ToastrService,
   ) {
    this.route.params.subscribe(
      params => {
        this.userService.findByUsername(this.userService.getUsername()).subscribe(user => {
          this.user = user;
          console.log(user);
          this.cartService.findCartsForUser(this.user.id).subscribe(carts => {
            this.carts = carts;
            this.cartLength = this.carts.length;
            console.log(this.cartLength);
          });
     
        })
      }
    )
    
   }

  ngOnInit(): void {
    this.user=this.login.getUser();
  }
 
  finishOrder(orderFinished: boolean) {
    this.orderFinished = orderFinished;
  }


  deleteCart(idPro, idUser) {
    if (confirm('Are you sure')) {
      this.cartService.removeFromCart(idPro, idUser).subscribe(() => {
        window.location.reload();
      })
    }
  }
}
