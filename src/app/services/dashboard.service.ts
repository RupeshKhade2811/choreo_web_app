import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { SharedService } from './shared.service';
import urls from 'src/properties';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

    // public userData:any
    public userId:any;
    public userRole:any;
    
    public lati: number | null=null;
    public longi:number | null=null;

    // public userId:any="598d968b-a7ac-4d26-87a4-ed4659e2d472";

    constructor(private http:HttpClient , private sharedServices:SharedService ) {
      
      
      this.userId  = sessionStorage.getItem('userData');
    this.userRole = sessionStorage.getItem('userRole');
    console.log(this.userId);
 
    }

    showUser(userId?:any){
      // const showurl= `http://localhost:8080/user/fetchUser?id=${userId}`;
      const showurl= `${urls.checkUser}?id=${userId}`;
      // const headers = new HttpHeaders({
      //   'Content-Type': 'application/json',
      //   // 'userId':userId 
      // });
      // const options = {headers:headers};
      return this.http.get(showurl);
    }


    checkUser(userId?:any){
      const showurl= `http://localhost:8080/user/fetchUser/${userId}`;
     // const showurl= `${urls.showUser}`;
    //  const headers = new HttpHeaders({
    //    'Content-Type': 'application/json',
    //    // 'userId':userId 
    //  });
    // const options = {headers:headers};
     return this.http.get(showurl);
   }

    showUserForUserProfile(userId?:any){
     // const showurl= `http://localhost:8080/user/fetchUser?id=${userId}`;
      const showurl=`${urls.checkUser}?id=${userId}`;

      // const headers = new HttpHeaders({
      //   'Content-Type': 'application/json',
      //   'userId':this.userId
      // });
      // const options = {headers:headers};
      return this.http.get(showurl);
    }

    favVehicle(currentPage:any,pageSize:any){
      // const favVehUrl= `https://services-test.keyassure.live/appraisal/getFavoriteCards?pageNumber=${currentPage}&pageSize=${pageSize}`;
      const favVehUrl= `${urls.getFavouriteCards}?pageNumber=${currentPage}&pageSize=${pageSize}`;
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'userId':this.userId
      });
      const options = {headers:headers};
      return this.http.post(favVehUrl,null,options);
    }

    // roleDropDown(){
    //   const showurl= `${urls.roleDropdown}`;
    //   return this.http.post(showurl,null);
    // }
    
   

    // getModelDropDown(){
    //   // const url='https://services-test.keyassure.live/shipment/dlrInvVehMakeDropDown'; 
    //   const url= `${urls.deaInvMakeDropDown}`; 
      
    //   const headers = new HttpHeaders({
    //     'Content-Type': 'application/json',
    //     'userId':this.userId
    //   });
    //   const options = {headers:headers};
    //   return this.http.post(url,null,options);
    // }

   

    showDealer(dlrUserId:any){
      // const showDlrurl= 'https://services-test.keyassure.live/dealer/showDealer';
      const showDlrurl= 'https://services-test.keyassure.live/dealer/showDealer';
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'd2UserId':dlrUserId
      });
      const options = {headers:headers};
      return this.http.post(showDlrurl,null,options);
    }

    // checkUserName(userName:any){
    //   // const checkUserUrl= 'https://services-test.keyassure.live/user/checkUserName';
    //   const checkUserUrl= `${urls.checkUserName}`;
    //   const headers = new HttpHeaders({
    //     'Content-Type': 'application/json',
    //     'userName':userName
    //   });
    //   const options = {headers:headers};
    //   return this.http.post(checkUserUrl,null,options);
    // }




   

    uploadProfilePic(file:any){
      console.log(file);
      
      // const url ="https://services-test.keyassure.live/user/uploadProfilePic";
      const url =`${urls.uploadprofilePic}`;
      // const headers = new HttpHeaders({
      //   // 'Content-Type': 'multipart/form-data',
      //   'userId':this.userId
      // });
      //const options = {headers:headers};
      return this.http.post(url,file);

    }
    updateUserProfile(object:any,user_id:any){
     // alert("ok")
      const url =`${urls.editUser}?id=${user_id}`;

      // const headers = new HttpHeaders({
      //   'Content-Type': 'application/json',
      //   'userId':this.userId
      // });
      // const options = {headers:headers};
      return this.http.post(url,object);
    }

    deleteUserProfile(userId:any){
      
      const url ="https://services-test.keyassure.live/dealer/deletedealer";
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'dealerId':userId
      });
      const options = {headers:headers};
      return this.http.post(url,null,options);
    }
  

    // Get the current location using navigator.geolocation
     getWeatherData() {
      return new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(successCallback );

          function successCallback(position: GeolocationPosition) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            // Make a request to your server with the latitude and longitude
            const url = `${urls.dash}?lati=${latitude}&longi=${longitude}`;

            // Make an HTTP request to fetch weather data
            fetch(url)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    // Resolve the promise with the retrieved weather data

                    console.log(data);
                    
                    resolve(data);
                })
                .catch(error => {
                    // Reject the promise with the error
                    reject(error);
                });
        }


          });
     }

           


getWeatherData1(){
 return this.getWeatherData();
 
//  .then(weatherData => {
//       // Use the weather data here
//       console.log(weatherData);
//   })
//   .catch(error => {
//       // Handle errors here
//       console.error('Error:', error);
//   });

}


    


  
}


   