import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { FileHandle } from './../../../models/file-handle.model';
import { MAT_DIALOG_DATA ,MatDialog} from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { ProduitService } from 'src/app/services/produit.service';

@Component({
  selector: 'app-show-pro-dialog',
  templateUrl: './show-pro-dialog.component.html',
  styleUrls: ['./show-pro-dialog.component.css']
})
export class ShowProDialogComponent implements OnInit {
 productId:any;
 dataa:Product;
  constructor(@Inject(MAT_DIALOG_DATA) public data,public crudApi: ProduitService,private _route:ActivatedRoute) { }

  ngOnInit(): void {
    this.receiveImages();
    console.log(this.dataa.productId);
      /*this.productId=this.data.productId;
      console.log(this.productId);
      this.crudApi.getData(this.productId).subscribe((data:any)=>{
        this.data=data;
        console.log(data);
        //this.qTitle=data;
      },(error)=>{
        console.log(error)
      });*/

      }

  receiveImages(){
   
    
      //this.crudApi.getData(this.data.productId).subscribe((data:any)=>{
//this.data=data;
        console.log(this.data);
    //  })
    
  
}
}