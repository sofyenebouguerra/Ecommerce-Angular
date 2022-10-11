
import { AddProduitComponent } from './../add-produit/add-produit.component';
import { AddTagToProductComponent } from './../add-tag-to-product/add-tag-to-product.component';
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
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { ParametreService } from 'src/app/services/parametre.service';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

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
    private tagService: TagService, private commentService: CommentService ,public dialogRef: MatDialogRef<AddProduitComponent>,private matDialog: MatDialog,public fb: FormBuilder, public toastr: ToastrService) {
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
    this.productService.choixmenu = "M";
    this.productService.dataForm = this.fb.group(Object.assign({}, item));
    this.matDialog.open(AddProduitComponent);
  }
  exportTPdf() {
    alert("ok pdf");
    this.productService.exportToPdf().subscribe(responseMessage =>{
     this.toastr.warning('Edition faite Avec Success');
   })

  }



  exporToExcel() {
    this.productService.getExcelData().subscribe((responseMessage) => {
      let file = new Blob([responseMessage], { type: 'application/vnd.ms-excel' });
      var fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    })
   
  }
  generatePdf()
{
  
 const document = this.productService.getDocument();
 alert("Are you sure");
 pdfMake.createPdf(document).open(); 

}

}
