import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { PureAbility } from '@casl/ability';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
 
  public able_to!: PureAbility;

  constructor( private fb:FormBuilder, private loginServices:LoginService){
    
   
  }

  loginDetails = this.fb.group({
    userId:[null],
    password:[null]
  });

  public authUser(){
    console.log(this.loginDetails.value.userId+" "+this.loginDetails.value.password);
    
    this.loginServices.authenticateUser(this.loginDetails.value.userId, this.loginDetails.value.password).subscribe((response)=>{
      console.log(response);
    });

  }
}
