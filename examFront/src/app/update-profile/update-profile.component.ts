import { Component, OnInit } from '@angular/core';
import { User } from '../models/Modal';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {

  progressBar = false;
  user: User = {} as User;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.findByUsername(this.userService.getUsername()).subscribe(user => {
      this.user = user;
    })
  }

  updateUser(idUser) {
    this.userService.editUser(this.user, idUser).subscribe(user => {
      this.user = user;
      window.location.reload();
    })
  }
}
