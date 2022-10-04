import { ProductService } from './../services/product.service';
import { LoginService } from './../services/login.service';
import { AddProductComponent } from './../pages/admin/add-product/add-product.component';


import { MatDialog } from '@angular/material/dialog';

import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

import { UpdateProfileComponent } from '../update-profile/update-profile.component';
import { Cart, Category, User } from '../models/Modal';
import { UserService } from '../services/user.service';
import { CartService } from '../services/cart.service';
import { CategoryService } from '../services/category.service';
import { AddCategoryComponent } from '../pages/admin/add-category/add-category.component';
import { AddTagComponent } from '../pages/admin/add-tag/add-tag.component';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User = {} as User;
  categories: Category[];
  carts: Cart[];
  cartLength = 0;

  constructor(private userService: UserService, private route: ActivatedRoute, private dialog: MatDialog,
    private categoryService: CategoryService, private cartService: CartService,private  productService: ProductService,private router: Router,private login:LoginService) {
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
          this.categoryService.findAllCategories().subscribe(categories => {
            this.categories = categories;
          })
        })
      }
    )
  }

  ngOnInit(): void {
    this.user=this.login.getUser();
  }
  
  logout(id: number) {
    window.location.replace("/dashboard");
    this.userService.signOut();
  }
  addCategory(idUser: number) {
    this.dialog.open(AddCategoryComponent, {
      data: { idUser }
    })
  }

  addProduct(idCategory) {
    this.dialog.open(AddProductComponent, {
      data: { idCategory }
    })
  }

  addTag() {
    this.dialog.open(AddTagComponent);
  }
  updateProfile(id:any) {
    this.dialog.open(UpdateProfileComponent);
  }
  deleteCart(idPro, idUser) {
    if (confirm('Are you sure')) {
      this.cartService.removeFromCart(idPro, idUser).subscribe(() => {
        window.location.reload();
      })
    }
  }
  sangleProduct(name) {
    this.router.navigate(['/puy/product/', name]);
  }
}
