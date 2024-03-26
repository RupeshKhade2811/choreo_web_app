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

    // public userId:any="598d968b-a7ac-4d26-87a4-ed4659e2d472";

    constructor(private http:HttpClient , private sharedServices:SharedService ) {
      
      
      this.userId  = sessionStorage.getItem('userData');
    this.userRole = sessionStorage.getItem('userRole');
    console.log(this.userId);
    }

    showUser(userId?:any){
       const showurl= `http://localhost:8080/user/fetchUser?id=${userId}`;
      // const showurl= `${urls.showUser}`;
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
      const showurl= `http://localhost:8080/user/fetchUser?id=${userId}`;
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

    ftryTrainingPortal(userId:any){
      // const ftryTrngUrl= 'https://services-test.keyassure.live/trainingportal/trainingDownload';
      const ftryTrngUrl= `${urls.trainingPortalGetData}`;
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'userId':userId
      });
      const options = {headers:headers};
      return this.http.post(ftryTrngUrl,null,options);
    }

    roleDropDown(){
      const showurl= `${urls.roleDropdown}`;
      return this.http.post(showurl,null);
    }
    
    searchDealer(){
      // const searchDlrurl= 'https://services-test.keyassure.live/dealer/searchDlrD2';
      const searchDlrurl= `${urls.searchDealerByName}`;
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'userId':this.userId
      });
      const options = {headers:headers};
      return this.http.post(searchDlrurl,null,options);

    }

    getModelDropDown(){
      // const url='https://services-test.keyassure.live/shipment/dlrInvVehMakeDropDown'; 
      const url= `${urls.deaInvMakeDropDown}`; 
      
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'userId':this.userId
      });
      const options = {headers:headers};
      return this.http.post(url,null,options);
    }

    getDealerInvReport(currentPage:any,pageSize:any,body:any){
      // const url=`https://services-test.keyassure.live/shipment/dlrInvntryTableList?pageNo=${currentPage}&pageSize=${pageSize}`;
      const url=`${urls.dealerInventoryReport}?pageNo=${currentPage}&pageSize=${pageSize}`;
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'userId':this.userId
      });
      const options = {headers:headers};
      return this.http.post(url,body,options);
    }

    // getDealerInvPdf(body:any){
    //   body.vehicleMake
    //   const url=`https://services-test.keyassure.live/shipment/genDlrInvntryReport?consumerAskPrice=0&daysSinceInventory=${body.daysSinceInventory}&delrRetlAskPrice=${body.delrRetlAskPrice}&userId=598d968b-a7ac-4d26-87a4-ed4659e2d472&vehicleMake=${body.vehicleMake}`;
    //   const headers = new HttpHeaders({
    //     'Content-Type': 'application/json',
    //     'userId':this.userId
    //   });
    //   // const options = {headers:headers};
    //   return this.http.get(url);
    // }

    getSalesReport(currentPage:any,pageSize:any,startDate:any,endDate:any){
      // const url=`https://services-test.keyassure.live/shipment/saleTableList?end=${endDate}&pageNo=${currentPage}&pageSize=${pageSize}&start=${startDate}`;
      const url=`${urls.salesReport}?end=${endDate}&pageNo=${currentPage}&pageSize=${pageSize}&start=${startDate}`;
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'userId':this.userId
      });
      const options = {headers:headers};
      return this.http.post(url,null,options);
    }
    getPurchaseReport(currentPage:any,pageSize:any,startDate:any,endDate:any){
      // const url=`https://services-test.keyassure.live/shipment/purchaseTableList?end=${endDate}&pageNo=${currentPage}&pageSize=${pageSize}&start=${startDate}`;
      const url=`${urls.purchaseReport}?end=${endDate}&pageNo=${currentPage}&pageSize=${pageSize}&start=${startDate}`;
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'userId':this.userId
      });
      const options = {headers:headers};
      return this.http.post(url,null,options);
    }

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

    checkUserName(userName:any){
      // const checkUserUrl= 'https://services-test.keyassure.live/user/checkUserName';
      const checkUserUrl= `${urls.checkUserName}`;
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'userName':userName
      });
      const options = {headers:headers};
      return this.http.post(checkUserUrl,null,options);
    }

    createDealer(object:any){
      // const url = "https://services-test.keyassure.live/dealer/savedealer";   
      const url = `${urls.dealerRegister}`;   
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',        
      });
      const options = {headers:headers};
      return this.http.post(url,object,options);
    }



    updateDealer(object:any, d2UserId:any){
      // const url = "https://services-test.keyassure.live/dealer/dealerUpdate";   
      const url = `${urls.updateDealer}`;   
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',   
        'd2UserId':d2UserId  
      });
      const options = {headers:headers};
      return this.http.post(url,object,options);
    }

    uploadProfilePic(file:any){
      console.log(file);
      
      // const url ="https://services-test.keyassure.live/user/uploadProfilePic";
      const url ="http://localhost:8080/user/uploadProPic";
      // const headers = new HttpHeaders({
      //   // 'Content-Type': 'multipart/form-data',
      //   'userId':this.userId
      // });
      //const options = {headers:headers};
      return this.http.post(url,file);

    }
    updateUserProfile(object:any,user_id:any){
     // alert("ok")
      const url =`http://localhost:8080/user/editUser?id=${user_id}`;
      // const headers = new HttpHeaders({
      //   'Content-Type': 'application/json',
      //   'userId':this.userId
      // });
      // const options = {headers:headers};
      return this.http.post(url,object);
    }

    deleteUserProfile(userId:any){
      alert("ok")
      const url ="https://services-test.keyassure.live/dealer/deletedealer";
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'dealerId':userId
      });
      const options = {headers:headers};
      return this.http.post(url,null,options);
    }
    
    payment(token:any){
      const url = "https://services-test.keyassure.live/shipment/payment";   
      const headers = new HttpHeaders({ 
        userId:"598d968b-a7ac-4d26-87a4-ed4659e2d472",
        token:token       
      });
      const options = {headers:headers};
      return this.http.post(url,null,options);
    }
    gadgetPayment(token:any){
      const url = "https://services-test.keyassure.live/shipment/accessoriesPay";   
      const headers = new HttpHeaders({ 
        userId:"598d968b-a7ac-4d26-87a4-ed4659e2d472",
        token:token       
      });
      const options = {headers:headers};
      return this.http.post(url,null,options);
    }
    custServicePayment(token:any){
      const url = "https://services-test.keyassure.live/shipment/custSupportPay";   
      const headers = new HttpHeaders({ 
        userId:"598d968b-a7ac-4d26-87a4-ed4659e2d472",
        token:token       
      });
      const options = {headers:headers};
      return this.http.post(url,null,options);
    }

  
}