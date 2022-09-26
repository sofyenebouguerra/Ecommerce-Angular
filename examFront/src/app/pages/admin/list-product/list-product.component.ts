import { AddProduitComponent } from './../add-produit/add-produit.component';

import { Component, OnInit, Inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from "rxjs";
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators }
  from '@angular/forms';
import { ProduitService } from 'src/app/services/produit.service';
import { Product } from 'src/app/models/product.model';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { ParametreService } from 'src/app/services/parametre.service';
  pdfMake.vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit {

  p: number = 1;

  codef: number = 0;
  control: FormControl = new FormControl('');
  constructor(public crudApi: ProduitService, public toastr: ToastrService,
    private router: Router, public fb: FormBuilder,
    private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddProduitComponent>,private parametreService:ParametreService) { }

  ngOnInit() {

    /*if (this.userService.four) {
      this.codef = parseInt(localStorage.getItem('codef'));

      this.getlistArtf(this.codef);
    }
    else {
      this.getData();

    }*/
   this.getData();

  }
  addArticle() {
    this.crudApi.choixmenu = "A";
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "70%";
    //dialogConfig.data="gdddd";
    this.matDialog.open(AddProduitComponent, dialogConfig);
  }




  getData() {
    
    this.crudApi.getAll().subscribe(
      response => {
        
        this.crudApi.list = response;
        console.log(response);
      }
    );

  }

  /*getlistArtf(code: number) {

    this.crudApi.getListArtf(code).subscribe(
      response => { this.crudApi.list = response; }
    );

  }*/
  exportTPdf() {
    alert("ok pdf");
    this.crudApi.exportToPdf().subscribe(responseMessage =>{
     this.toastr.warning('Edition faite Avec Success');
   })

  }



  exporToExcel() {
    this.crudApi.getExcelData().subscribe((responseMessage) => {
      let file = new Blob([responseMessage], { type: 'application/vnd.ms-excel' });
      var fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    })
   
  }

  removeData(id:number) {
    if (window.confirm('Are sure you want to delete this Article ?')) {
      this.crudApi.deleteData(id)
        .subscribe(
          data => {
            console.log(data);
            this.toastr.warning(' data successfully deleted!');
              this.getData();
        
          },
          error => console.log(error));
    }
  }
  selectData(item: Product) {
    this.crudApi.choixmenu = "M";
    this.crudApi.dataForm = this.fb.group(Object.assign({}, item));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "70%";

    this.matDialog.open(AddProduitComponent, dialogConfig);
  }

  generatePdf()
{
  
 const document = this.crudApi.getDocument();
 alert("Are you sure");
 pdfMake.createPdf(document).open(); 

}
}

