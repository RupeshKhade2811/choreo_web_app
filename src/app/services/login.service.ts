import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }
  
  authenticateUser(userId:any,password:any){
    const url = 'https://services-test.keyassure.live/user/findUser';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'userName':userId,
      'password':password
    });
    const options = {headers:headers};
    return this.http.post(url,null,options);
  }

}
