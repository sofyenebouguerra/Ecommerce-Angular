import { ProduitService } from './../../../services/produit.service';
import { Component, OnInit, Inject } from '@angular/core';


import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators }
  from '@angular/forms';
import { Router } from '@angular/router';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-produit',
  templateUrl: './add-produit.component.html',
  styleUrls: ['./add-produit.component.css']
})
export class AddProduitComponent implements OnInit {
  num: any;
  code: string;
  userFile;
  public imagePath;
  imgURL: any;
  public message: string;
  codef : string;
  name : string;
  
  constructor(public crudApi: ProduitService, public fb: FormBuilder, public toastr:ToastrService,
  
    private router: Router, @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<AddProduitComponent>,

  ) { }
  get f() { return this.crudApi.dataForm.controls; }
  ngOnInit() {
    if (this.crudApi.choixmenu == "A") { this.infoForm() };
   
    
   // this.codef = localStorage.getItem('codef');
    //this.f['codef'].setValue(this.codef);
    
  }

  infoForm() {
    this.crudApi.dataForm = this.fb.group({
      productId: null,
      productName: ['', [Validators.required]],
      productDescription: ['', [Validators.required]],
      productDiscountPrice: [0, [Validators.required]],
      productActualPrice: [0, [Validators.required]],
    
    
    });
    //console.log(this.crudApi.dataForm);
  }

  ResetForm() {
    this.crudApi.dataForm.reset();
  }
  onSubmit() {
    if (this.crudApi.choixmenu == "A") {
      this.addData();
    }
    else {
      this.updateData()
    }
  }



  addData() {
 
    const formData = new FormData();
    
    const product = this.crudApi.dataForm.value;
    formData.append('product', JSON.stringify(product));
    formData.append('file', this.userFile);
    this.crudApi.createData(formData).subscribe(data => {
      this.dialogRef.close();
     
      this.crudApi.getAll().subscribe(
        response =>{this.crudApi.list = response;}
       );
    
     
      this.router.navigate(['/list-proAr']);
    });


  }
  updateData() {
    this.crudApi.updatedata(this.crudApi.dataForm.value).
      subscribe(data => {
        this.dialogRef.close();
        this.crudApi.getAll().subscribe(
          response =>{this.crudApi.list = response;}
         );
        this.router.navigate(['/list-proAr']);
      });
  }

  onSelectFile(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.userFile = file;
      // this.f['profile'].setValue(file);

      var mimeType = event.target.files[0].type;
      if (mimeType.match(/image\/*/) == null) {
        this.toastr.success('Only images are supported.');

        return;
      }
      var reader = new FileReader();
      this.imagePath = file;
      reader.readAsDataURL(file);
      reader.onload = (_event) => {
        this.imgURL = reader.result;
      }
    }
  }
}
