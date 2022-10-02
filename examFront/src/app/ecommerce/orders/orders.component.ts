import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ProductOrders, User } from 'src/app/models/Modal';
import { LoginService } from 'src/app/services/login.service';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders: ProductOrders;
  total: number;
  paid = false;
  sub: Subscription;
  user: User = new User();
  hideUpdateMessage = true;
  id: number;
  name: string
  username: string;
  email: string;
  password: string;
  nameOnCard: string;
  cardNumber: string;
  cvv: number;
  address: string;
  errorMessage: string;
  hideDiv = true;
  newDate: Date;
  hideItem: boolean;
  isLoggedIn=false;
  constructor(private orderService: OrderService, private userService: UserService, private dialog: MatDialog,public loginn :LoginService) {
    this.orders = this.orderService.ProductOrders;
  }

  ngOnInit() {

    this.isLoggedIn=this.loginn.isLoggedIn();
    this.user=this.loginn.getUser();
    this.loginn.loginStatusSubject.asObservable().subscribe(data=>{
      this.isLoggedIn=this.loginn.isLoggedIn();
      this.user=this.loginn.getUser();
    });


    
    this.userService.findByUsername(this.userService.getUsername()).subscribe(user => {
      this.user = user;
      if (this.nameOnCard != null || this.cardNumber || this.cvv || this.address) {
        this.nameOnCard = this.user.nameOnCard;
        this.cardNumber = this.user.cardNumber;
        this.cvv = this.user.cvv;
        this.address = this.user.address;
      }
    })
    this.sub = this.orderService.OrdersChanged.subscribe(() => {
      this.orders = this.orderService.ProductOrders;
    });
    this.loadTotal();
    this.newDate = new Date();
  }

  pay() {
    this.paid = true;
    this.hideDiv = false;
    this.orderService.saveOrder(this.orders).subscribe();
  }

  loadTotal() {
    this.sub = this.orderService.TotalChanged.subscribe(() => {
      this.total = this.orderService.Total;
    });
  }

  goToHome() {
    window.location.reload();
  }

 /* goToUpdateProfile(idUser) {
    this.hideUpdateMessage = false;
    this.dialog.open(UpdateProfileComponent, {
      data: { idUser }
    })
  }*/

}
