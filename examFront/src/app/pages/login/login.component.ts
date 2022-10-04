import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { LoginService } from './../../services/login.service';
import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import { User } from 'src/app/models/Modal';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginData:any={
    username:'',
    password:'',
  };

  progressBar = false;
  userr: User = {} as User;
  username: string;
  password: string;

  constructor(private login:LoginService,  private snack:MatSnackBar,private router:Router,private userService:UserService) { }


  ngOnInit(): void {
  
  }


  addUser() {

  }

  formSubmit(){
    console.log("login btn clicked");


    if(
      this.loginData.password.trim() =='' ||
      this.loginData.password==null
    ){
      this.snack.open("Password is required !! ",'',{
        duration:3000,
      });
      return;
    }
 

    //request to server to generate token
    this.login.generateToken(this.loginData).subscribe(
      (data:any)=>{
        console.log('success');
        console.log(data);
        //login
        this.login.loginUser(data.token);

        this.login.getCurrentUser().subscribe(
          (user:any)=>{
            this.login.setUser(user);
            console.log(user);

            this.progressBar = true;
            console.log(this.username)
              this.userService.saveUsername(user.username);
            
            

        //redirect .... ADMIN:admin-dashboard
          //redirect .... Normal:normal-dashboard
            if(this.login.getUserRole()=='ADMIN'){
              //admin dashboard
              //window.location.href='/admin';
              //this.router.navigate(['dashboard']);
              //window.location.replace("/dashboard")
              this.login.loginStatusSubject.next(true)
              window.location.reload();

            }else if (this.login.getUserRole()=='NORMAL'){
              window.location.reload();
              //this.router.navigate(['user-dashboard']);
              this.login.loginStatusSubject.next(true)
              //window.location.replace("/dashboard")
              //window.location.href='/user-dashboard';
            }else{
              this.login.logout();

            }



          }
        );


      },
      (error)=>{
        console.log('Error !');
        console.log(error);
      }


    );
  }

}
