import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import urls from 'src/properties';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor( private http:HttpClient) { 

  }

  getUserData(){
    //D1
    const userId='jamesrobert999';
    const password = 'James@123';
//D2
    // const userId='yogeshkumar12';
    // const password = 'Yogesh@123';
//D3
    // const userId='jamesrobert999';
    // const password = 'James@123';
//A1
    // const userId='jamesrobert999';
    // const password = 'James@123';
//A2
    // const userId='jamesrobert999';
    // const password = 'James@123';

    //P
    // const userId=' chrisjordan123';
    // const password = 'Chris@123';
//s1
    // const userId='LarryLeasure22';
    // const password = 'Leasure@1234';

    //m1
    // const userId='jamesrobert999';
    // const password = 'James@123';

   

    const url = 'https://services-test.keyassure.live/user/findUser';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'userName':userId,
      'password':password
    });
    const options = {headers:headers};
    return this.http.post(url,null,options);
  }

  getUserId(){
   const url = `${urls.getUserId}`;
   const headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });
  const options = {headers:headers};
  return this.http.get(url,options);
  }

  getUserDetails(userId:any){
    
    const url = `${urls.getUserDetails}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'userId':userId,
    });
    const options = {headers:headers};
    return this.http.post(url,null,options);
  }

}
