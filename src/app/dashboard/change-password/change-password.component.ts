import { DialogRef } from '@angular/cdk/dialog';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { identityRevealedValidator } from '../checkPassword';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent   {

  public password :any;
  public matched:boolean=false;
  hide1: boolean=true;
  hide2:boolean= true;
 


  constructor( public dialogRef: DialogRef<string>,private fb:FormBuilder, private snackBar: MatSnackBar, public dialog: MatDialog
    ){}
  

  public changePassFormGroup =new FormGroup({
    'newPassword': new FormControl(null,Validators.required),
    'confirmPassword': new FormControl(null,Validators.required)
  },{validators:identityRevealedValidator});
  

  onNoClick(): void {
    this.dialogRef.close();
 
  }


 

}
