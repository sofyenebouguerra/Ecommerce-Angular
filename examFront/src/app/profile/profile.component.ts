import { SignupComponent } from './../pages/signup/signup.component';
import { AddProduitComponent } from './../pages/admin/add-produit/add-produit.component';
import { ProductService } from './../services/product.service';
import { LoginService } from './../services/login.service';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UpdateProfileComponent } from '../update-profile/update-profile.component';
import { Cart, Category, User } from '../models/Modal';
import { UserService } from '../services/user.service';
import { CartService } from '../services/cart.service';
import { CategoryService } from '../services/category.service';
import { AddCategoryComponent } from '../pages/admin/add-category/add-category.component';
import { AddTagComponent } from '../pages/admin/add-tag/add-tag.component';
import { FormControl, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


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

  p: number = 1;
  control: FormControl = new FormControl('');
  constructor(public userService: UserService, private route: ActivatedRoute, private dialog: MatDialog,
    private categoryService: CategoryService, private cartService: CartService,private  productService: ProductService,private router: Router,private login:LoginService,public toastr: ToastrService,
   public fb: FormBuilder,private matDialog: MatDialog,
   @Inject(MAT_DIALOG_DATA) public data: any,
   public dialogRef:MatDialogRef<SignupComponent>) {
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
     this. getData()
  }
  
  logout(id: number) {
     this.login.logout();
    this.login.loginStatusSubject.next(false);
    window.location.reload;
  }
  addCategory(idUser: number) {
    this.dialog.open(AddCategoryComponent, {
      data: { idUser }
    })
  }

  addProduct(idCategory) {
    this.dialog.open(AddProduitComponent, {
      data: { idCategory }
    })
  }

  addTag() {
    this.dialog.open(AddTagComponent);
  }
  updateProfile(id:any) {

    this.dialog.open(UpdateProfileComponent, {
      data: { id }
    })
    //this.router.navigate(['/signup/',id]);
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

  getData() {
    this.userService.findAllUsers().subscribe(
      data =>{this.userService.list = data;}
     );
   
  }
  
 
  removeData(idUser: number) {
    if (window.confirm('Are sure you want to delete this User ?')) {
    this.userService.deleteUser(idUser)
      .subscribe(
        data => {
          console.log(data);
          this.toastr.warning(' data successfully deleted!'); 
          this.getData();
        },
        error => console.log(error));
  }
  }
  selectData(item : User) {
    this.userService.choixmenu = "M";
    this.userService.formData = this.fb.group(Object.assign({},item));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = false;
    dialogConfig.width="50%";
    
    this.matDialog.open(SignupComponent, dialogConfig);
  }
}
