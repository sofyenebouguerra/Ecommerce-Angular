

import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  submitted = false;
  userFile;
  public imagePath;
  imgURL: any;
  pwdd :string;
  acceptTerms : string;
  constructor(public userService:UserService ,public fb: FormBuilder,public toastr: ToastrService,
    private router : Router) { }

  ngOnInit(): void {
  
    this.infoForm();
   }

   get f() { return this.userService.formData.controls; }

  
  infoForm() {
    this.userService.formData = this.fb.group({
        id: null,
        username: ['', [Validators.required, Validators.minLength(5)]],
        firstName: ['', [Validators.required, Validators.minLength(5)]],
        email: ['', [Validators.required, Validators.minLength(8)]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        });
    }
   
  

  onReset() {
    this.submitted = false;
      this.userService.formData.reset();
  }
  onSubmit() {
    
    this.submitted = true;
    const val = this.userService.formData.value;
  //  if (val.password == val.pwdd)
 //   {
      if (this.userService.choixmenu == "A")
      {
        this.addData();
      }
      else
      {
       this.updateData()
      }
  /*  }
    else
    {
      this.toastr.warning( 'Vérifiet votre de passe ...');  
    }*/
}
  
   

addData() {
  const formData = new FormData();
    
    const users = this.userService.formData.value;
    formData.append('user', JSON.stringify(users));
    formData.append('file', this.userFile);
    this.userService.createData(formData).subscribe( data => {
    this.toastr.success( 'Validation Faite avec Success'); 
    this.router.navigate(['/login']);
  });
}

  updateData()
  {
  
    this.userService.updatedata(this.userService.formData.value.id,this.userService.formData.value).
    subscribe( data => {
      this.toastr.success( 'Modification Faite avec Success');

      this.router.navigate(['/users']);
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



