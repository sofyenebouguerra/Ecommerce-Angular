import { LoginService } from '../../services/login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileeComponent implements OnInit {
  user:any=null;

  constructor(private login:LoginService) { }

  ngOnInit(): void {
    this.user=this.login.getUser();
    console.log(this.user);
  }
 
}
