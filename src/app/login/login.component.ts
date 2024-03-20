import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { AppAbility } from '../services/AppAbility';
import { Observable } from 'rxjs';
import { AbilityService } from '@casl/angular';
import { PureAbility } from '@casl/ability';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  readonly ability$: Observable<AppAbility>;
  public able_to!: PureAbility;

  constructor(abilityService: AbilityService<AppAbility>,private readonly ability: AppAbility ,private fb:FormBuilder, private loginServices:LoginService){
    
    this.ability$=abilityService.ability$;

    this.ability$.subscribe(r=>{
      this.able_to=r;

    })
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
