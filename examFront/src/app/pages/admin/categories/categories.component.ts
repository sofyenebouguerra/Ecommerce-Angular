import { AddProduitComponent } from './../add-produit/add-produit.component';
import { AddTagToProductComponent } from './../add-tag-to-product/add-tag-to-product.component';
import { AddProductComponent } from './../add-product/add-product.component';
import { AddCategoryComponent } from './../add-category/add-category.component';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { Category, User, Tag } from 'src/app/models/Modal';
import { CategoryService } from 'src/app/services/category.service';
import { CommentService } from 'src/app/services/comment.service';
import { ProductService } from 'src/app/services/product.service';
import { TagService } from 'src/app/services/tag.service';
import { UserService } from 'src/app/services/user.service';
import { ProduitService } from 'src/app/services/produit.service';
import { FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  idCategory: number;
  products: Product[];
  category: Category = {} as Category;
  user: User = {} as User;
  panelOpenState: boolean;
  tags: Tag[];
  comments: any[];

  constructor(private productService: ProductService, private categoryService: CategoryService,
    private route: ActivatedRoute, private dialog: MatDialog, private userService: UserService,
    private tagService: TagService, private commentService: CommentService ,public dialogRef: MatDialogRef<AddProduitComponent>,private matDialog: MatDialog,public crudApi: ProduitService,public fb: FormBuilder) {
    this.route.params.subscribe(
      params => {
        this.idCategory = this.route.snapshot.params['idCategory'];
        this.categoryService.findCategoryById(this.idCategory).subscribe(category => {
          this.category = category;
          this.productService.findProductsForCategory(this.idCategory).subscribe(products => {
            this.products = products;
          });
        })
        this.userService.findByUsername(this.userService.getUsername()).subscribe(user => {
          this.user = user;
        })
        this.commentService.findAllComments().subscribe(comments => {
          this.comments = comments;
        })
      }
    )
  }

  ngOnInit(): void {
  }

  addTag(idProduct) {
    this.dialog.open(AddTagToProductComponent, {
      data: { idProduct }
    })
  }
  showTags(idProduct) {
    this.tagService.findTagsForProduct(idProduct).subscribe(tags => {
      this.tags = tags;
    })
  }
  deleteCategory(idCategory, idUser) {
    if (confirm("Are you sure")) {
      this.categoryService.deleteCategory(idCategory).subscribe(() => {
        window.location.replace(`/profile/${idUser}`)
      })
    }
  }
  editCategory(idCategory) {
    this.dialog.open(AddCategoryComponent, {
      data: { idCategory }
    })
  }
  deleteProduct(productId, idUser) {
    if (confirm("Are you sure")) {
      this.productService.deleteProduct(productId).subscribe(() => {
        window.location.replace(`/profile/${idUser}`)
      })
    }
  }
  editProduct(idProduct) {
    this.dialog.open(AddProduitComponent, {
      data: { idProduct }
    })
  }
  deleteComment(id) {
    this.commentService.deleteComment(id).subscribe(() => {
      window.location.reload();
    })
  }

  selectData(item: Product) {
    this.crudApi.choixmenu = "M";
    this.crudApi.dataForm = this.fb.group(Object.assign({}, item));
    this.matDialog.open(AddProduitComponent);
  }

}
