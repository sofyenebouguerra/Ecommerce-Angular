import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/Modal';
import { Product } from 'src/app/models/product.model';
import { LoginService } from 'src/app/services/login.service';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-display-category',
  templateUrl: './display-category.component.html',
  styleUrls: ['./display-category.component.css']
})
export class DisplayCategoryComponent implements OnInit {

  orderFinished = false;
  idCategory: number;
  products: Product[] = [];
  product: Product = {} as Product;
  showBtn = -1;
  showMyContainerInfo = false;
  user: User = new User();
  isLoggedIn=false;
  constructor(private route: ActivatedRoute, private productService: ProductService,
    private router: Router, private userService: UserService,public loginn :LoginService) {
      this.userService.findByUsername(this.userService.getUsername()).subscribe(user => {
        this.user = user;
      });
    this.route.params.subscribe(
      params => {
        this.idCategory = this.route.snapshot.params['idCategory'];
        this.productService.findProductsForCategory(this.idCategory).subscribe(products => {
          this.products = products;
        }
        );
      }
    )
  }

  ngOnInit() {
    this.isLoggedIn=this.loginn.isLoggedIn();
    this.user=this.loginn.getUser();
    this.loginn.loginStatusSubject.asObservable().subscribe(data=>{
      this.isLoggedIn=this.loginn.isLoggedIn();
      this.user=this.loginn.getUser();
    });
  }

  url: string = "../assets/memeT/1n.jpg";
  
  imageChange(event: any){
      this.url = event.target.src;
  }

  showUndoBtn(index) {
    this.showBtn = index;
  }
  productInfo(id: number) {
    this.productService.findProductById(id).subscribe(product => {
      this.product = product;
    });
    this.showMyContainerInfo = !this.showMyContainerInfo;
  }
  sngleProduct(id: number) {
    this.router.navigate(['sangle/product', id]);
  }
}
