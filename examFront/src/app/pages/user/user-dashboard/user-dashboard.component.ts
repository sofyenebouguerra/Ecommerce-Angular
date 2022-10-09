import { SignupComponent } from './../../signup/signup.component';
import { Component, OnInit,Inject } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import {MatDialog, MatDialogConfig, MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/Modal';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
 
  p: number = 1;
  control: FormControl = new FormControl('');
  constructor(public crudApi: UserService, public toastr: ToastrService,
    private router : Router,public fb: FormBuilder,
    private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef:MatDialogRef<SignupComponent>,) { }
 
  ngOnInit() {
    
    this.getData();
    console.log(this.data);
  }
  addUser()
  {
    this.crudApi.choixmenu = "A";
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="70%";
    //dialogConfig.data="gdddd";
    this.matDialog.open(SignupComponent, dialogConfig);
  }
 
  

  
  getData() {
    this.crudApi.findAllUsers().subscribe(
      data =>{this.crudApi.list = data;}
     );
   
  }
  
 
  removeData(idUser: number) {
    if (window.confirm('Are sure you want to delete this User ?')) {
    this.crudApi.deleteUser(idUser)
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
    this.crudApi.choixmenu = "M";
    this.crudApi.formData = this.fb.group(Object.assign({},item));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    
    this.matDialog.open(SignupComponent, dialogConfig);
  }
}
