import { Router } from '@angular/router';
import { LoginService } from './../../services/login.service';
import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
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

  constructor(private login:LoginService,  private snack:MatSnackBar,private router:Router) { }


  ngOnInit(): void {
  }

  formSubmit(){
    console.log("login btn clicked");

    if(
      this.loginData.username.trim() =='' ||
      this.loginData.username==null
    ){
      this.snack.open("Username is required !! ",'',{
        duration:3000,
      });
      return;
    }
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
        //redirect .... ADMIN:admin-dashboard
          //redirect .... Normal:normal-dashboard
            if(this.login.getUserRole()=='ADMIN'){
              //admin dashboard
              //window.location.href='/admin';
              this.router.navigate(['dashboard']);
              window.location.replace("/dashboard")
              this.login.loginStatusSubject.next(true)

            }else if (this.login.getUserRole()=='NORMAL'){
              this.router.navigate(['user-dashboard']);
              this.login.loginStatusSubject.next(true)
              window.location.replace("/dashboard")
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
