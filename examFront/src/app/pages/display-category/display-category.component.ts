import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

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

  constructor(private route: ActivatedRoute, private productService: ProductService,
    private router: Router) {
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
