import { UserService } from 'src/app/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { LoginService } from './../../services/login.service';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/models/Modal';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn=false;
  categories: Category[];
  user:any=null;

  constructor(public login :LoginService,public dialog: MatDialog, private categoryService: CategoryService,private userService:UserService) {

   }


  
  ngOnInit(): void { 
    this.isLoggedIn=this.login.isLoggedIn();
    this.user=this.login.getUser();
    this.login.loginStatusSubject.asObservable().subscribe(data=>{
      this.isLoggedIn=this.login.isLoggedIn();
      this.user=this.login.getUser();
    
    });
    
    this.categoryService.findAllCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

public logout(){
  this.login.logout();
  window.location.reload();
  //this.login.loginStatusSubject.next(false);
}


}
