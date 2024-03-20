import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  userData:any;

  constructor(private loginService:LoginService, private http:HttpClient) { }
  
  setUserData(data:any){
    this.userData=data;
  }

  getUserData(){
    return this.userData;
  }
}
