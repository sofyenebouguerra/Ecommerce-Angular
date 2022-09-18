import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
public user={
  username:'',
  password:'',
  firstname:'',
  lastName:'',
  email:'',
  phone:'',

};

  constructor(private userService:UserService) { }

  ngOnInit(): void {
  }

  formSubmit(){
    console.log(this.user);
    if(this.user.username =='' || this.user.username==null){
      alert('User is required !!');
      return;
    }
    this.userService.addUser(this.user).subscribe((data:any)=>{
      console.log(data);
     Swal.fire('Successfully done','userr id is' +data.id,'success');
    },
    (error)=>{
      console.log(error);
      Swal.fire('Error','user is not registred','error');
    }
    )

  }

}
