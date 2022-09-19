import { FileHandle } from './../../../models/file-handle.model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-show-pro-dialog',
  templateUrl: './show-pro-dialog.component.html',
  styleUrls: ['./show-pro-dialog.component.css']
})
export class ShowProDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit(): void {
    this.receiveImages();
  }

  receiveImages(){
  console.log(this.data);
  }

}
