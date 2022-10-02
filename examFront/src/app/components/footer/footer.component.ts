import { Product } from './../../models/product.model';
import { ProduitService } from './../../services/produit.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(public crudApi: ProduitService) { }
  products:Product[];
  ngOnInit(): void {
   this.getData();
  }


  getData() {
    
    this.crudApi.getAll().subscribe(
      response => {
        
        this.crudApi.list = response;
        console.log(response);
      }
    );

  }

}
